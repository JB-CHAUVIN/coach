import * as WebBrowser from "expo-web-browser";
import { STRAVA_CONFIG } from "../../../../../config/strava";
import AuthSession, {
  makeRedirectUri,
  useAuthRequest,
} from "expo-auth-session";
import { useEffect } from "react";

let redirectUri = "https://400m.coach/oauth.php";

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: "https://www.strava.com/oauth/mobile/authorize",
  tokenEndpoint: "https://www.strava.com/oauth/token",
  revocationEndpoint: "https://www.strava.com/oauth/deauthorize",
};

export const useLoginWithStrava = () => {
  const redirectUri = makeRedirectUri({
    native: "https://400m.coach",
  });

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: STRAVA_CONFIG.clientId,
      scopes: ["activity:read_all"],
      redirectUri,
    },
    discovery,
  );

  const exchangeToken = async (code: string) => {
    const { accessToken } = await AuthSession.exchangeCodeAsync(
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

    console.log('[INFO] accessToken', accessToken);
  };

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      exchangeToken(code);
    }
  }, [response]);

  const handleLoginWithStrava = async () => {
    console.log("[INFO] redirectUri", redirectUri);
    promptAsync();
  };

  return {
    handleLoginWithStrava,
  };
};
