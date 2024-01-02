import {useRef, useState} from "react";
import { CONFIG } from "../constants/config";
import { Platform } from "react-native";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setQueryStore } from "../store/slices/querySlices";
import { useUser } from "./useUser";
import Toast from 'react-native-toast-message';
import {PHRASES} from "../constants/phrases";

export const API_ENDPOINTS = {
  EVENT_CRUD: "api/events",
  EVENT_GET: "api/events?sort=date&populate=event",
  LOGIN: "api/auth/local",
  REGISTER: "api/auth/local/register",
  USER: "api/users",
  DETOX_GET: "api/detoxes?sort=date",
  DETOX: "api/detoxes",
  STATS_GET: "api/stats",
};

export const QUERY_IDS = {
  HOME_ITEMS: "HOME_ITEMS",
  DETOX_ITEMS: "DETOX_ITEMS",
  STATS: "STATS",
};

const DEBUG = false;

export const useQuery = (
  url: string,
  options?: {
    id?: string;
  },
) => {
  const { user } = useUser();

  const { id = false } = options || {};
  const [dataState, setDataState] = useState(false);
  // @ts-ignore
  const dataStore = useAppSelector((s) => s?.query?.[id]);
  const data = id ? dataStore : dataState;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const errorObject = useRef({});

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

  const handleQuery = <T>(
    method: string,
    options?: {
      body?: T;
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
    } else if (body) {
      theBody = body;
    }

    setIsLoading(true);
    let TARGET_ENDPOINT = CONFIG.BACKEND + url;
    // @ts-ignore
    if (body && typeof body?.id !== "undefined") {
      // @ts-ignore
      TARGET_ENDPOINT += "/" + body.id;
    }

    let headers = {
      "Content-Type": "application/json",
      "User-Agent": "Application (" + Platform.OS + ")",
      "Authorization": "",
    };

    if (user?.jwt) {
      headers = {
        ...headers,
        Authorization: "Bearer " + user?.jwt,
      };
    }

    const fetchOptions = {
      method: method || "GET",
      headers,
      body: theBody ? JSON.stringify(theBody) : undefined,
    };

    if (DEBUG) {
      console.log("[INFO] Query on " + TARGET_ENDPOINT, fetchOptions);
    }

    let status = 0;
    fetch(TARGET_ENDPOINT, fetchOptions)
      .then((response) => {
        status = response.status;
        return response.json();
      })
      .then((result) => {
        if (DEBUG) {
          console.log(
            "[INFO] Success query " + TARGET_ENDPOINT + " : ",
            JSON.stringify(result),
          );
        }

        let success = false;
        if (status >= 200 && status <= 299) {
          success = true;
        }

        if (success) {
          setData(result?.data || result);
          onSuccess(result?.data || result);
        } else {
          setError(result);
          errorObject.current = result;
          throw new Error('Something went wrong ...');
        }

        setIsLoading(false);
      })
      .catch((error) => {
        if (DEBUG) {
          console.log(
            "[INFO] Error query " + TARGET_ENDPOINT + " : ",
            JSON.stringify(errorObject.current),
          );
        }

        Toast.show({
          type: 'error',
          text1: PHRASES.FR.ERROR_TITLE,
          // @ts-ignore
          text2: errorObject.current?.error?.message || PHRASES.FR.ERROR_DESC,
        });

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
