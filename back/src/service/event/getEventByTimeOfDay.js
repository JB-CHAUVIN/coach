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
  };

  const events = await strapi.entityService.findMany("api::event.event", {
    filters,
  });

  const event = events?.[0];

  console.log('[INFO] Finding event by time of day', JSON.stringify({
    filters,
    hours,
    minutes,
    activityDate,
    event,
    events,
  }))

  return {
    events,
    event,
  };
};

module.exports = {
  getEventByTimeOfDay,
};
