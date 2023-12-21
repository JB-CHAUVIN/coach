const axios = require("axios");
const STRAVA_CONFIG = require("../../config/strava.json");
const { getStravaHeaders } = require("./_stravaApi");

const stravaGetActivity = async (activityId, user) => {
  const res = await axios.get(
    STRAVA_CONFIG.STRAVA_ENDPOINT + "/activities/" + activityId,
    {
      headers: await getStravaHeaders(user),
    }
  );
  const { data = {} } = res || {};
  return data;
};

module.exports = {
  stravaGetActivity,
};
