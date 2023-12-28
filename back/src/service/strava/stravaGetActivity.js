const axios = require("axios");
const STRAVA_CONFIG = require("../../config/strava.json");
const { getStravaHeaders } = require("./_stravaApi");
const {
  convertirTempsEnSecondes,
  calculerAllureMoyenne
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
  if(data && data.length > 0 && activityDistance) {
    // d'abord on regarde si le nombre de splits est le même que la distance
    const distance1KMSplits = Math.round(activityDistance / 1000);
    const numberOfSplits = Math.round(data.length);

    const isSameSplitsLessOrMore = numberOfSplits === distance1KMSplits || numberOfSplits === distance1KMSplits - 1 || numberOfSplits === distance1KMSplits + 1;

    let timesArray = [];
    let distancesArray = [];

    training = "";
    times = "";
    if(!isSameSplitsLessOrMore) {
      data.map(split => {
        const { average_speed, total_elevation_gain, elapsed_time, distance, pace_zone } = split || {};

        const isTrack = total_elevation_gain < 1;
        const distanceInKm = Math.round(distance / 1000);
        const distanceInM = Math.round(distance);
        const distanceSplit = isTrack ? distanceInM : distanceInKm;
        const unitSplit = isTrack ? "m" : "km";
        const minutes = Math.floor(elapsed_time / 60);
        const seconds = elapsed_time - minutes * 60;
        const timeElapsed = elapsed_time <= 60 ? `${elapsed_time}''` : `${minutes}'${seconds}''`;

        if(pace_zone > 1) {
          if(training.length === 0) {
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
      })

      // allure moyenne des intervalles
      if(times.length > 0) {
        times = `${times} (${calculerAllureMoyenne(timesArray, distancesArray)})`;
      }
    }
  }

  return {
    analysis: training.length > 0 ? `${training}\n${times}` : '',
    data,
  };
};

module.exports = {
  stravaGetActivity,
  stravaGetActivityLaps,
};
