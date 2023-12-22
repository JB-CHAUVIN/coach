const { stravaRefreshTokenIfNeeded } = require("./stravaRefreshTokenIfNeeded");

const debug = true;
const getStravaHeaders = async (user) => {
  const {
    stravaToken: accessToken,
    stravaRefreshToken: refreshToken,
    stravaTokenExpiresAt: expires,
    id: entityId,
  } = user || {};

  const theToken = await stravaRefreshTokenIfNeeded(
    expires,
    accessToken,
    refreshToken,
    entityId
  );

  return {
    Authorization: "Bearer " + theToken,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
};

module.exports = {
  getStravaHeaders,
};
