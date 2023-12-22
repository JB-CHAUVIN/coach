const IS_PROD = !__DEV__;

export const CONFIG = {
    BACKEND: !IS_PROD ? 'http://localhost:1338/' : "https://api.400m.coach/"
}
