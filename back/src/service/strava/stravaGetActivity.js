const axios = require("axios");
const STRAVA_CONFIG = require("../../config/strava.json");
const { getStravaHeaders } = require("./_stravaApi");
const {
  convertirTempsEnSecondes,
  calculerAllureMoyenne,
} = require("../utils/date");

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

const DEBUG_ANALYSIS = false;

const stravaGetActivityLaps = async (activity, activityId, user) => {
  const res = await axios.get(
    STRAVA_CONFIG.STRAVA_ENDPOINT + "/activities/" + activityId + "/laps",
    {
      headers: await getStravaHeaders(user),
    }
  );
  const { data = {} } = res || {};

  let training = "";
  let times = "";

  const activityDistance = activity?.distance;

  if (DEBUG_ANALYSIS) {
    // console.log('[INFO] data', data);
    console.log("[INFO] activityDistance", activityDistance);
  }

  if (data && data.length > 0 && activityDistance) {
    const hasSomeFastSplits = data.some((split) => split.pace_zone > 1);

    let timesArray = [];
    let distancesArray = [];

    DEBUG_ANALYSIS &&
      console.log("[INFO] hasSomeFastSplits ?", hasSomeFastSplits);

    training = "";
    times = "";
    if (hasSomeFastSplits) {
      data.map((split) => {
        const {
          average_speed,
          total_elevation_gain,
          elapsed_time,
          distance,
          pace_zone,
        } = split || {};

        const isTrack = total_elevation_gain < 1;
        const distanceInKm = Math.round(distance / 1000);
        const distanceInM = Math.round(distance);
        const distanceSplit = isTrack ? distanceInM : distanceInKm;
        const unitSplit = isTrack ? "m" : "km";
        const minutes = Math.floor(elapsed_time / 60);
        const seconds = elapsed_time - minutes * 60;
        const timeElapsed =
          elapsed_time <= 60 ? `${elapsed_time}''` : `${minutes}'${seconds}''`;

        if (pace_zone > 1) {
          if (training.length === 0) {
            training = `📊 `;
            times = `⏱️  `;
          } else {
            training = `${training} / `;
            times = `${times} / `;
          }

          timesArray.push(elapsed_time);
          distancesArray.push(distance);

          training = `${training}${distanceSplit}${unitSplit}`;
          times = `${times}${timeElapsed}`;
        }
      });

      // allure moyenne des intervalles
      if (times.length > 0) {
        times = `${times} (${calculerAllureMoyenne(
          timesArray,
          distancesArray
        )})`;
      }
    }
  }

  if (DEBUG_ANALYSIS) {
    console.log("[INFO] training", training);
    console.log("[INFO] times", times);
  }

  return {
    analysis: training.length > 0 ? `${training}\n${times}` : "",
    data,
  };
};

module.exports = {
  stravaGetActivity,
  stravaGetActivityLaps,
};
