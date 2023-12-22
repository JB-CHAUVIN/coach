const moment = require("moment");

const getEventByTimeOfDay = async (start_date) => {
  const activityDate = moment(start_date);
  const hours = activityDate.get("hours");
  const minutes = activityDate.get("minutes");

  let time = "";
  if (hours < 12) {
    time = "matin";
    if (hours === 11 && minutes > 30) {
      time = "midi";
    }
  } else if (hours >= 12 && hours < 14) {
    time = "midi";
  } else if (hours >= 14 && hours < 17) {
    time = "apres-midi";
  } else {
    time = "soir";
  }
  const filters = {
    time,
    date: activityDate.format("YYYY-MM-DD"),
    stravaFlaggedAuto: false,
  };

  let events = await strapi.entityService.findMany("api::event.event", {
    filters,
  });

  let event = events?.[0];

  // if no event by time, we try to find atleast an event for this date
  if (!event) {
    events = await strapi.entityService.findMany("api::event.event", {
      filters: {
        date: activityDate.format("YYYY-MM-DD"),
        stravaFlaggedAuto: false,
      },
    });

    event = events?.[0];
  }

  return {
    events,
    event,
  };
};

module.exports = {
  getEventByTimeOfDay,
};
