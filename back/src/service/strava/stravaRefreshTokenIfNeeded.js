const moment = require("moment");
const axios = require("axios");
const STRAVA_CONFIG = require("../../config/strava.json");

const FORCE_UPDATE = false;
const DEBUG = true;
const model = "plugin::users-permissions.user";

const stravaRefreshTokenIfNeeded = async (
  expires,
  accessToken,
  refreshToken,
  entityId
) => {
  const isExpired = FORCE_UPDATE || moment(expires).isBefore(moment());

  let token = accessToken;

  if (isExpired) {
    if (DEBUG) {
      console.log("[INFO] Token is expired. We update it.");
    }

    const oauthTokenParams = {
      client_id: STRAVA_CONFIG.STRAVA_CLIENT_ID,
      client_secret: STRAVA_CONFIG.STRAVA_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    };

    if (DEBUG) {
      console.log("[INFO] Strava update token params are :", oauthTokenParams);
    }

    const res = await axios.post(
      "https://www.strava.com/oauth/token",
      oauthTokenParams
    );

    const { data = {} } = res || {};
    if (DEBUG) {
      console.log("[INFO] Strava update token response is :", data);
    }

    const { access_token, refresh_token, expires_in } = data || {};

    const oldItem = await strapi.entityService.findOne(model, entityId);
    const newItem = {
      data: {
        ...oldItem,
        stravaToken: access_token,
        stravaRefreshToken: refresh_token,
        stravaTokenExpiresAt: moment().add(expires_in, "seconds").toISOString(),
      },
    };

    if (DEBUG) {
      console.log("[INFO] Updating user", newItem);
    }

    const updated = await strapi.entityService.update(model, entityId, newItem);

    if (DEBUG) {
      console.log("[INFO] Updated item", updated);
    }
  }

  return token;
};

module.exports = {
  stravaRefreshTokenIfNeeded,
};
