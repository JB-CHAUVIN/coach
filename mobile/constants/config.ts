const IS_PROD = __DEV__;

export const CONFIG = {
    BACKEND: !IS_PROD ? 'http://localhost:1337/' : "https://api.400m.coach/"
}
