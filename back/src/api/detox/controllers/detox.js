"use strict";

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
/**
 * detox controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::detox.detox", ({ strapi }) => ({
  async validateStravaWebhook(ctx) {
    ctx.response.status = 200;
    ctx.response.body = ctx?.request?.query;
  },

  async find(ctx) {
    const { user } = ctx.state;

    if (!ctx?.request?.query?.filters) {
      ctx.request.query.filters = {};
    }

    if (!ctx?.request?.query?.filters["user"]) {
      ctx.request.query.filters["user"] = {};
    }

    ctx.request.query.filters["user"]["id"] = user?.id || 0;

    const result = await super.find(ctx);

    return result;
  },

  async delete(ctx) {
    const { user } = ctx.state;
    const { id } = ctx.params;
    const entity = await strapi.entityService.findOne("api::detox.detox", id, {
      populate: { user: true },
    });

    if(entity?.user?.id !== user?.id) {
      throw new Error('Unauthorized');
    }

    const result = await super.delete(ctx);

    return result;
  },

  async create(ctx) {
    const { user } = ctx.state;

    if (user?.id && ctx?.request?.body?.data) {
      ctx.request.body.data.user = {
        connect: [user?.id],
      };
    }

    const result = await super.create(ctx);

    return result;
  },
}));
