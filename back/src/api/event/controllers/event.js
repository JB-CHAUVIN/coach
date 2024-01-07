"use strict";

const { orderBy } = require("lodash");
const {
  stravaGetActivity,
  stravaGetActivityLaps,
} = require("../../../service/strava/stravaGetActivity");
const {
  getEventByTimeOfDay,
} = require("../../../service/event/getEventByTimeOfDay");
const {
  stravaUpdateActivity,
} = require("../../../service/strava/stravaUpdateActivity");
const { getEventByType } = require("../../../service/event/getEventByType");
const moment = require("moment");
const { enumerateDaysBetweenDates } = require("../../../utils/date");
const { createEvents } = require("../_routes/createEvents");
const { createFromStrava } = require("../_routes/createFromStrava");
const { getUser } = require("../../../utils/user");

/**
 * event controller
 */

const DEBUG = false;

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::event.event", ({ strapi }) => ({
  async validateStravaWebhook(ctx) {
    ctx.response.status = 200;
    ctx.response.body = ctx?.request?.query;
  },

  async find(ctx) {
    const { user } = ctx.state;

    const theUser = await getUser(user?.id);

    if (!ctx?.request?.query?.filters) {
      ctx.request.query.filters = {};
    }

    if (!ctx?.request?.query?.filters["user"]) {
      ctx.request.query.filters["user"] = {};
    }

    // remove clubs
    ctx.request.query.filters["club"] = {
      id: {
        $lt: 1,
      }
    };

    ctx.request.query.filters["user"]["id"] = user?.id || 0;

    let result = await super.find(ctx);
    let clubEvents = [];

    if (theUser?.club?.id && theUser?.pendingJoinClub === false) {
      const filtersClubEvents = {
        club: {
          id: theUser?.club?.id,
        },
        date: ctx?.request?.query?.filters?.date,
      };

      clubEvents = await strapi.entityService.findMany("api::event.event", {
        filters: filtersClubEvents,
        populate: {
          club: {
            populate: {
              logo: true,
            }
          },
        },
      });

      for (let j in clubEvents) {
        const clubEvent = clubEvents[j];
        const { id } = clubEvent;
        result.data.push({
          id,
          attributes: clubEvent,
        });
      }
    }

    const { date } = ctx?.request?.query?.filters || {};
    const startOfWeek = date["$gte"] || moment().startOf("week");
    const endOfWeek = date["$lte"] || moment().endOf("week");

    let dates = enumerateDaysBetweenDates(
      moment(startOfWeek),
      moment(endOfWeek)
    );
    let newResult = [];
    for (let i in result?.data) {
      const item = result?.data[i];
      const { date } = item?.attributes;
      if (dates.includes(date)) {
        dates = dates.filter((d) => d !== date);
      }
    }

    newResult = newResult.concat(result?.data);

    for (let i in dates) {
      // add missing dates to fill the week
      newResult.push({
        id: 0,
        attributes: {
          date: dates[i],
          fake: true,
        },
      });
    }

    newResult = orderBy(newResult, "attributes.date", "asc");

    return {
      ...result,
      data: newResult,
    };
  },

  async create(ctx) {
    await createEvents(ctx);
    return await super.create(ctx);
  },

  async createFromStrava(ctx) {
    return await createFromStrava(ctx);
  },
}));
