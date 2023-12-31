const {
  stravaGetActivity,
  stravaGetActivityLaps,
} = require("../../../service/strava/stravaGetActivity");
const {
  getEventByTimeOfDay,
} = require("../../../service/event/getEventByTimeOfDay");
const { getEventByType } = require("../../../service/event/getEventByType");
const {
  stravaUpdateActivity,
} = require("../../../service/strava/stravaUpdateActivity");

const DEBUG = false;
const createFromStrava = async (ctx) => {
  const {
    object_id = 0,
    object_type = "activity",
    owner_id = 0,
    aspect_type = "create",
  } = ctx?.request?.body || {};

  console.log("[INFO] Body", ctx?.request?.body);

  if (object_type === "activity" && aspect_type === "create") {
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

    DEBUG && console.log("[INFO] Found user", user);

    if (user?.id) {
      /**
       * Fetch activity from Strava.
       * @type {*}
       */
      const activity = await stravaGetActivity(object_id, user);
      const { data: laps, analysis } = await stravaGetActivityLaps(
        activity,
        object_id,
        user
      );
      const { start_date_local } = activity || {};

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
      const ignoreStravaWebhook = existingActivity && aspect_type === "create"; // strava bug

      DEBUG && console.log("[INFO] Found activity", activity);
      DEBUG && console.log("[INFO] Found activity laps", laps);
      DEBUG && console.log("[INFO] Activity analysis", analysis.length > 0);

      /**
       * Find corresponding event in our database.
       */
      const { event, events } = await getEventByTimeOfDay(start_date_local);

      // we must have only one matching event!
      if (
        events.length === 1 &&
        !event?.stravaFlaggedAuto &&
        event?.done === false
      ) {
        DEBUG && console.log("[INFO] Let's update event");

        // and we update strava activity
        const eventInfos = getEventByType(event?.seance || "matin");

        try {
          if (eventInfos?.label) {
            // title
            let stravaData = {
              name: eventInfos?.label + " " + eventInfos?.emoji,
            };
            if (event?.seance_variation) {
              stravaData.name = `${stravaData.name} [${event?.seance_variation}]`;
            }

            let hasSubText = false;
            let subText = "";
            if (event?.description) {
              subText = `${event?.description}\n`;
              hasSubText = true;
            }

            if (analysis.length > 0) {
              subText = `${subText}\n${analysis}`;
              hasSubText = true;
            }

            if (hasSubText) {
              stravaData.description = subText;
            }

            // do not update activity with description, since it has alread been modified
            if (!ignoreStravaWebhook && (!activity?.description || activity?.description?.length === 0)) {
              await stravaUpdateActivity(activity?.id, stravaData, user);
            }
          }
        } catch (err) {}

        if(!ignoreStravaWebhook) {
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
      }

      const bodyActivity = {
        ...filtersActivity,
        data: {
          ...activity,
          laps,
        },
      };

      if (user?.id) {
        bodyActivity.user = {
          connect: [user?.id],
        };
      }

      if (event?.id) {
        bodyActivity.event = {
          connect: [event?.id],
        };
      }

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

  ctx.response.status = 200;
  ctx.response.body = {
    status: "ok",
  };
};

module.exports = {
  createFromStrava,
};
