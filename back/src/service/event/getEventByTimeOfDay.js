const moment = require("moment");

const DEBUG = true;

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

  if (DEBUG) {
    console.log("[INFO] Get event by time of day : " + time);
  }

  const filters = {
    time,
    date: activityDate.format("YYYY-MM-DD"),
    stravaFlaggedAuto: false,
  };

  if (DEBUG) {
    console.log("[INFO] Getting events with filters : ", filters);
  }
  let events = await strapi.entityService.findMany("api::event.event", {
    filters,
  });

  let event = events?.[0];

  // if no event by time, we try to find atleast an event for this date
  if (!event) {
    const filters2 = {
      date: activityDate.format("YYYY-MM-DD"),
      stravaFlaggedAuto: false,
    };

    if (DEBUG) {
      console.log("[INFO] Getting events with filters : ", filters2);
    }

    events = await strapi.entityService.findMany("api::event.event", {
      filters: filters2,
    });

    event = events?.[0];
  }

  if(DEBUG) {
    console.log("[INFO] Event found : ", event);
    console.log("[INFO] Events found : ", events);
  }

  return {
    events,
    event,
  };
};

module.exports = {
  getEventByTimeOfDay,
};
