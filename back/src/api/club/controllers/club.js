"use strict";

const { joinClub } = require("../_routes/joinClub");
const { validateUser } = require("../_routes/validateUser");
const { getUser, isUserCoachAndInClub } = require("../../../utils/user");
const { getClub } = require("../../../utils/club");
const {getEventsByClubId} = require("../../../utils/events");
const moment = require("moment");
const { formatItemAsStrapiResult } = require("../../../utils/_strapi");

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::club.club", ({ strapi }) => ({
  async findOne(ctx) {
    const { user } = ctx.state;
    const clubId = ctx.request.params?.id;
    const theUser = await getUser(user?.id);

    if(clubId != theUser?.club?.id) {
      return ctx.badRequest("You are not allowed to see this club");
    }

    // get club goals (events)
    const filtersClubEvents = {
      date: {
        $gte: moment().subtract(1, 'day').format('YYYY-MM-DD'),
      },
      seance: "course",
    };

    const clubEvents = await getEventsByClubId(theUser?.club?.id, filtersClubEvents);

    let result = await super.findOne(ctx);

    result.data.attributes.goals = {};
    result.data.attributes.goals.data = clubEvents.map(i => formatItemAsStrapiResult(i));

    return result;
  },

  async create(ctx) {
    const { user } = ctx.state;

    if (user?.id && ctx?.request?.body?.data) {
      ctx.request.body.data.users = {
        connect: [user?.id],
      };
    }

    let result = await super.create(ctx);

    return result;
  },

  async update(ctx) {
    const { user } = ctx.state;
    const clubId = ctx.request.params?.id;
    const theUser = await getUser(user?.id);
    const theClub = await getClub(clubId);

    if (!isUserCoachAndInClub(theUser, theClub?.id)) {
      return ctx.badRequest("You are not allowed to update this club");
    }

    let result = await super.update(ctx);
    return result;
  },

  async joinClub(ctx) {
    return await joinClub(ctx);
  },

  async validateUser(ctx) {
    return await validateUser(ctx);
  },
}));
