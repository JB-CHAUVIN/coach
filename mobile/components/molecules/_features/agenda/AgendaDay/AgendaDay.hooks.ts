import {
  API_ENDPOINTS,
  QUERY_IDS,
  useQuery,
} from "../../../../../hooks/useQuery";
import moment from "moment/moment";
import { TYPE_EVENTS } from "../../../../../../types/Events";
import { TYPE_STRAPI_RESULT } from "../../../../../../types/_Strapi";
import { useAppDispatch } from "../../../../../store/store";
import {
  removeStoreItem,
  updateStoreItem,
} from "../../../../../store/slices/querySlices";
import { confirm } from "../../../../../utils/confirm";
import { PHRASES } from "../../../../../constants/phrases";

export const useUpdateEvent = () => {
  const { handleQuery, isLoading } = useQuery(API_ENDPOINTS.EVENT_CRUD);
  const dispatch = useAppDispatch();

  const handleEventDone = (id: number, done: boolean) => {
    let body: { id: number; done: boolean; stravaFlaggedAuto?: boolean } = {
      id,
      done,
    };

    if (done === false) {
      // Qand on passe un élément en not done, désactiver également le flag stravaFlaggedAuto
      body.stravaFlaggedAuto = false;
    }

    handleQuery("PUT", {
      body,
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

export const useDeleteEvenet = (id: number) => {
  const { handleQuery, isLoading } = useQuery(
    API_ENDPOINTS.EVENT_CRUD + "/" + id,
  );
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    confirm(PHRASES.FR.DELETE_EVENT, () => {
      handleQuery("DELETE", {
        onSuccess: (i: TYPE_STRAPI_RESULT<TYPE_EVENTS>) => {
          if (i?.id) {
            dispatch(removeStoreItem({ key: QUERY_IDS.HOME_ITEMS, value: id }));
          }
        },
      });
    });
  };

  return {
    handleDelete,
    isLoading,
  };
};
