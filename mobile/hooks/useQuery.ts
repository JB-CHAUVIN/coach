import { useState } from "react";
import { CONFIG } from "../constants/config";
import { Platform } from "react-native";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setQueryStore } from "../store/slices/querySlices";
import { TYPE_STRAPI_RESULT } from "../../types/_Strapi";
import { TYPE_EVENTS } from "../../types/Events";

export const API_ENDPOINTS = {
  EVENT_CRUD: "api/events",
  EVENT_GET: "api/events?sort=date",
};

export const QUERY_IDS = {
  HOME_ITEMS: "HOME_ITEMS",
};

const DEBUG = true;

export const useQuery = (
  url: string,
  options?: {
    id?: string;
  },
) => {
  const { id = false } = options || {};
  const [dataState, setDataState] = useState(false);
  // @ts-ignore
  const dataStore = useAppSelector((s) => s?.query?.[id]);
  const data = id ? dataStore : dataState;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useAppDispatch();
  const setData = (data: any) => {
    if (id) {
      // go to store
      dispatch(setQueryStore({ key: id, value: data }));
    } else {
      // go to local state
      setDataState(data);
    }
  };

  const handleQuery = (
    method: string,
    options?: {
      body: { id: number; done: boolean };
      isStrapi?: boolean;
      onSuccess: (i: any) => void;
    },
  ) => {
    const {
      body = undefined,
      isStrapi = true,
      onSuccess = () => {},
    } = options || {};

    let theBody = undefined;
    if (isStrapi && body) {
      theBody = {
        data: body,
      };
    }

    setIsLoading(true);
    let TARGET_ENDPOINT = CONFIG.BACKEND + url;
    if (body?.id) {
      TARGET_ENDPOINT += "/" + body.id;
    }

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
          onSuccess(result.data);
        } else {
          setError(result);
        }

        setIsLoading(false);
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
