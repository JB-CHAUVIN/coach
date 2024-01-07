"use strict";

const {joinClub} = require("../_routes/joinClub");
const { validateUser } = require("../_routes/validateUser");
/**
 * club controller
 */

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

  async joinClub(ctx) {
    return await joinClub(ctx);
  },

  async validateUser(ctx) {
    return await validateUser(ctx);
  }
}));
