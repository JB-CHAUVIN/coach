import * as WebBrowser from "expo-web-browser";
import { STRAVA_CONFIG } from "../../../../../config/strava";
import { exchangeCodeAsync, useAuthRequest } from "expo-auth-session";
import { useEffect } from "react";
import { API_ENDPOINTS, useQuery } from "../../../../../hooks/useQuery";
import { useUser } from "../../../../../hooks/useUser";
import { useAppDispatch } from "../../../../../store/store";
import { setUser } from "../../../../../store/slices/userSlice";
import { TYPE_USER } from "../../../../../../types/User";
import {
  API_ENDPOINTS_STRAVA,
  useQueryStrava,
} from "../../../../../hooks/useQueryStrava";
import moment from "moment";

const redirectUri = "https://400m.coach/oauth.php";

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: "https://www.strava.com/oauth/mobile/authorize",
  tokenEndpoint: "https://www.strava.com/oauth/token",
  revocationEndpoint: "https://www.strava.com/oauth/deauthorize",
};

export const useLoginWithStrava = () => {
  const { user } = useUser();
  const dispatch = useAppDispatch();
  const { handleQuery, isLoading } = useQuery(
    API_ENDPOINTS.USER + "/" + user?.item?.id,
  );

  const { handleQuery: handleQueryStravaAthlete, result: resultStravaAthlete } =
    useQueryStrava(API_ENDPOINTS_STRAVA.GET_ATHLETE); // TODO : get user by ID (from token)

  const handleQueryPUTStravaToken = (
    accessToken: string | null,
    refreshToken: string | null | undefined,
    stravaTokenExpiresAt?: Date,
  ) => {
    handleQuery("PUT", {
      body: {
        stravaToken: accessToken,
        stravaRefreshToken: refreshToken,
        stravaTokenExpiresAt,
      },
      onSuccess: (res: TYPE_USER) => {
        console.log("[INFO] Success", res);
        if (res?.id) {
          dispatch(setUser(res));

          setTimeout(() => {
            if(accessToken) {
              handleQueryStravaAthlete(accessToken);
            }
          }, 500);
        }
      },
      isStrapi: false,
    });
  };

  useEffect(() => {
    handleQuery("PUT", {
      body: {
        stravaId: resultStravaAthlete?.id,
        stravaAthlete: resultStravaAthlete,
      },
      onSuccess: (res: TYPE_USER) => {
        console.log("[INFO] Success", res);
        if (res?.id) {
          dispatch(setUser(res));
        }
      },
      isStrapi: false,
    });
  }, [resultStravaAthlete]);

  const handleRemoveStravaToken = () => {
    handleQueryPUTStravaToken(null, null, null);
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: STRAVA_CONFIG.clientId,
      scopes: ["activity:read_all"],
      redirectUri,
    },
    discovery,
  );

  const exchangeToken = async (code: string) => {
    const res = await exchangeCodeAsync(
      {
        clientId: STRAVA_CONFIG.clientId,
        redirectUri,
        code,
        extraParams: {
          client_secret: STRAVA_CONFIG.clientSecret,
        },
      },
      { tokenEndpoint: "https://www.strava.com/oauth/token" },
    );

    const { accessToken, refreshToken, expiresIn } = res;

    console.log("[INFO] AccessToken", accessToken, res);

    if (accessToken) {
      handleQueryPUTStravaToken(accessToken, refreshToken, moment().add(expiresIn, 'seconds').toDate());
    }
  };

  useEffect(() => {
    // @ts-ignore
    const theCode = response?.params?.code;
    console.log("[INFO] Response", theCode);
    if (theCode) {
      exchangeToken(theCode);
    }
  }, [response]);

  const handleLoginWithStrava = async () => {
    console.log("[INFO] redirectUri", redirectUri);
    promptAsync();
  };

  return {
    isLoading,
    isLoggedInWithStava: user?.item?.stravaToken,
    handleRemoveStravaToken,
    handleLoginWithStrava,
  };
};
