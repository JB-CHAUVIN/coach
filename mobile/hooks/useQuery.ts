import { useState } from "react";
import { CONFIG } from "../constants/config";
import { Platform } from "react-native";

export const API_ENDPOINTS = {
  EVENT: "api/events",
};

const DEBUG = true;

export const useQuery = (url: string) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleQuery = (
    method: string,
    options?: { body: any; isStrapi?: boolean; onSuccess?: () => void },
  ) => {
    const { body = undefined, isStrapi = true, onSuccess = () => {} } = options || {};

    let theBody = undefined;
    if (isStrapi && body) {
      theBody = {
        data: body,
      };
    }

    setIsLoading(true);
    const TARGET_ENDPOINT = CONFIG.BACKEND + url;

    const fetchOptions = {
      method: method || "GET",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Application (" + Platform.OS + ")",
      },
      body: theBody ? JSON.stringify(theBody) : undefined,
    };

    if (DEBUG) {
      console.log("[INFO] Query on " + TARGET_ENDPOINT, fetchOptions);
    }

    fetch(TARGET_ENDPOINT, fetchOptions)
      .then((response) => response.json())
      .then((result) => {
        if (DEBUG) {
          console.log(
            "[INFO] Success query " + TARGET_ENDPOINT + " : ",
            JSON.stringify(result),
          );
        }

        if (result?.data) {
          setData(result.data);
        } else {
          setError(result);
        }

        setIsLoading(false);

        onSuccess();
      })
      .catch((error) => {
        if (DEBUG) {
          console.log(
            "[INFO] Error query " + TARGET_ENDPOINT + " : ",
            JSON.stringify(error),
          );
        }
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    handleQuery,
    error,
    data,
    isLoading,
  };
};
