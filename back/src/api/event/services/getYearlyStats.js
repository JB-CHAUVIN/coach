const moment = require("moment");
const { countBy } = require("lodash");
const getYearlyStats = async (ctx) => {
  const { user } = ctx.state;
  const {} = ctx.request.params;

  const findParams = {
    user: {
      id: user?.id || 0,
    },
    date: {
      $gte: moment().startOf("year").toDate(),
      $lte: moment().endOf("year").toDate(),
    },
  };

  const detox = await strapi.entityService.findMany("api::detox.detox", {
    filters: {
      ...findParams,
      detoxified: true,
    },
  });

  const events = await strapi.entityService.findMany("api::event.event", {
    filters: {
      ...findParams,
      done: true,
    },
  });

  const totals = {
    eventsDone: events?.length || 0,
    detoxDoneTotal: detox?.length || 0,
    detoxDone: countBy(detox, 'addiction'),
    distanceDone: events.reduce((acc, event) => {
      return acc + event?.distance || 0;
    }, 0),
    footingDone: events.reduce((acc, event) => {
      return acc + (event?.seance === 'footing' ? 1 : 0) || 0;
    }, 0),
    renfoDone: events.reduce((acc, event) => {
      return acc + (event?.seance === 'renforcement' ? 1 : 0) || 0;
    }, 0),
    qualityDone: events.reduce((acc, event) => {
      return acc + (event?.seance.includes(['tempo', 'fartlek', 'piste']) ? 1 : 0) || 0;
    }, 0),
    slDone: events.reduce((acc, event) => {
      return acc + (event?.seance.includes(['sl']) ? 1 : 0) || 0;
    }, 0),
  }

  ctx.body = {
    data: totals,
  };
};

module.exports = {
  getYearlyStats,
};
