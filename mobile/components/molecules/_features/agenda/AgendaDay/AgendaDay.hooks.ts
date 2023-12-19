import {API_ENDPOINTS, QUERY_IDS, useQuery} from "../../../../../hooks/useQuery";
import moment from "moment/moment";
import { TYPE_EVENTS } from "../../../../../../types/Events";
import { TYPE_STRAPI_RESULT } from "../../../../../../types/_Strapi";
import { useAppDispatch } from "../../../../../store/store";
import { updateStoreItem } from "../../../../../store/slices/querySlices";

export const useUpdateEvent = () => {
  const { handleQuery, isLoading } = useQuery(API_ENDPOINTS.EVENT_CRUD);
  const dispatch = useAppDispatch();

  const handleEventDone = (id: number, done: boolean) => {
    handleQuery("PUT", {
      body: {
        id,
        done,
      },
      onSuccess: (i: TYPE_STRAPI_RESULT<TYPE_EVENTS>) => {
        const { id, attributes } = i;
        dispatch(
          updateStoreItem({
            key: QUERY_IDS.HOME_ITEMS,
            // @ts-ignore
            value: i,
          }),
        );
      },
    });
  };

  return {
    handleEventDone,
  };
};
