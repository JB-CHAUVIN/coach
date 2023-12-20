const STRAVA_CONFIG_SHARED = require('./strava.json');

export const STRAVA_CONFIG = {
    endpoint: 'https://www.strava.com/api/v3',
    clientId: STRAVA_CONFIG_SHARED.STRAVA_CLIENT_ID,
    clientSecret: STRAVA_CONFIG_SHARED.STRAVA_CLIENT_SECRET,
};