import { useState } from "react";
import { useUser } from "./useUser";

const STRAVA_ENDPOINT = "https://www.strava.com";
export const API_ENDPOINTS_STRAVA = {
  GET_ACTIVITIES: "/api/v3/activities",
  GET_ATHLETE: "/api/v3/athlete",
};

export const useQueryStrava = (endpoint: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>({});

  const { user } = useUser();

  const handleQuery = (token: string | undefined) => {
    setIsLoading(true);

    fetch(STRAVA_ENDPOINT + endpoint, {
      headers: {
        Authorization: `Bearer ${token || user?.item?.stravaToken}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setResult(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    handleQuery,
    isLoading,
    result,
  };
};
