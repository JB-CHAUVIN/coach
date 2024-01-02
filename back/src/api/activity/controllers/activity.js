"use strict";



const {getYearlyStats} = require("../../event/services/getYearlyStats");
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::activity.activity", ({ strapi }) => ({
  async stats(ctx) {
    return await getYearlyStats(ctx);
  }
}));
