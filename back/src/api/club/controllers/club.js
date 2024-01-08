"use strict";

const { joinClub } = require("../_routes/joinClub");
const { validateUser } = require("../_routes/validateUser");
const { getUser, isUserCoachAndInClub } = require("../../../utils/user");
const { getClub } = require("../../../utils/club");

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::club.club", ({ strapi }) => ({
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
