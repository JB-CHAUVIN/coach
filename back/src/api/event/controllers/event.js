"use strict";

const {
  stravaGetActivity,
} = require("../../../service/strava/stravaGetActivity");
const moment = require("moment");
const {
  getEventByTimeOfDay,
} = require("../../../service/event/getEventByTimeOfDay");

/**
 * event controller
 */

const DEBUG = true;

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::event.event", ({ strapi }) => ({
  async createFromStrava(ctx) {
    const {
      object_id = 0,
      object_type = "activity",
      owner_id = 0,
      aspect_type = "create",
    } = ctx?.request?.body || {};

    DEBUG && console.log('[INFO] Body', ctx?.request?.body);

    if (object_type === "activity") {
      /**
       * Find corresponding user in our database (link strava <> user).
       * @type {{stravaId: number}}
       */
      const findParams = {
        stravaId: owner_id,
      };

      const users = await strapi.entityService.findMany(
        "plugin::users-permissions.user",
        {
          filters: findParams,
        }
      );

      const user = users?.[0];

      DEBUG && console.log('[INFO] Found user', user);

      if (user?.id) {
        /**
         * Fetch activity from Strava.
         * @type {*}
         */
        const activity = await stravaGetActivity(object_id, user);
        const { start_date } = activity || {};

        DEBUG && console.log('[INFO] Found activity', activity);

        /**
         * Find corresponding event in our database.
         */

        const { event, events } = await getEventByTimeOfDay(start_date);

        // we must have only one matching event!
        if (
          events.length === 1 &&
          !event?.stravaFlaggedAuto &&
          event?.done === false
        ) {
          DEBUG && console.log('[INFO] Let\'s update event');

          // we only automaticly link event once!
          await strapi.entityService.update("api::event.event", event?.id, {
            data: {
              stravaFlaggedAuto: true,
              done: true,
              distance: activity?.distance
                ? activity?.distance / 1000
                : event?.distance,
            },
          });
        }

        /**
         * Insert or update activity in our database.
         * @type {string}
         */
        const modelActivities = "api::activity.activity";
        const filtersActivity = {
          activity_id: activity?.id,
          type: "strava",
        };
        const existingActivities = await strapi.entityService.findMany(
          modelActivities,
          {
            filters: filtersActivity,
          }
        );

        const existingActivity = existingActivities?.[0];

        const bodyActivity = {
          ...filtersActivity,
          data: activity,
          user: {
            connect: [user?.id],
          },
          event: {
            connect: [event?.id],
          },
        };

        DEBUG && console.log('[INFO] Creating or updating activity', {
          bodyActivity: JSON.stringify(bodyActivity)
          existingActivity
        });


        if (!existingActivity) {
          await strapi.entityService.create(modelActivities, {
            data: {
              ...bodyActivity,
              publishedAt: new Date().getTime(),
            },
          });
        } else {
          await strapi.entityService.update(
            modelActivities,
            existingActivity?.id,
            {
              data: bodyActivity,
            }
          );
        }
      }
    }
  },
}));
