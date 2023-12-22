const axios = require("axios");
const STRAVA_CONFIG = require("../../config/strava.json");
const { getStravaHeaders } = require("./_stravaApi");

const stravaUpdateActivity = async (activityId, stravaData, user) => {
  const bearer = await getStravaHeaders(user);
  const url = STRAVA_CONFIG.STRAVA_ENDPOINT + "/activities/" + activityId;
  console.log(
    "[INFO] Strava, updating activity",
    url,
    JSON.stringify(stravaData),
    bearer
  );
  const res = await axios.put(
    url,
    stravaData,
    {
      headers: bearer,
    }
  );
  const { data = {} } = res || {};
  return data;
};

module.exports = {
  stravaUpdateActivity,
};
