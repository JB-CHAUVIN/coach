import {
  addictionTranslate,
  getAddictionByIndex,
} from "../../../../../constants/_features/addictions/addictions";
import { TYPE_STRAPI_RESULT } from "../../../../../../types/_Strapi";
import { TYPE_DETOX } from "../../../../../../types/Detox";
import {
  addStoreItem,
  removeStoreItem,
} from "../../../../../store/slices/querySlices";
import {
  API_ENDPOINTS,
  QUERY_IDS,
  useQuery,
} from "../../../../../hooks/useQuery";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useAppDispatch, useAppSelector } from "../../../../../store/store";
import moment from "moment/moment";
import ADDICTIONS from "../../../../../constants/_features/addictions/additionsTypes.json";
import { PHRASES } from "../../../../../constants/phrases";

export const useAgendaDayAddiction = (date: moment.Moment) => {
  const formattedDate = date?.format("YYYY-MM-DD");
  const { showActionSheetWithOptions } = useActionSheet();
  const dispatch = useAppDispatch();
  const detoxes = useAppSelector((s) => s?.query?.[QUERY_IDS.DETOX_ITEMS]);
  const detoxIgnored = useAppSelector((s) => s?.settings?.ignoredAddictions);

  const detoxDay = detoxes?.filter((i: TYPE_STRAPI_RESULT<TYPE_DETOX>) =>
    moment(i?.attributes?.date).isSame(formattedDate),
  );

  const isDetoxified = !!detoxDay.find(
    (i: TYPE_STRAPI_RESULT<TYPE_DETOX>) => i?.attributes?.detoxified === true,
  );

  // @ts-ignore
  const options = ADDICTIONS.filter((i) => !detoxIgnored.includes(i?.name))
    .map((i) => addictionTranslate(i?.name) + " ✔")
    .concat([PHRASES.FR.CANCEL]);

  const { isLoading, handleQuery } = useQuery(API_ENDPOINTS.DETOX_GET);
  const {
    isLoading: isLoadingDetoxDelete,
    handleQuery: handleQueryDetoxDelete,
  } = useQuery(API_ENDPOINTS.DETOX);

  const handleSave = (selectedIndex: number) => {
    const addiction = getAddictionByIndex(selectedIndex);
    const isAlreadyDetoxified =
      // @ts-ignore
      detoxDay.find<TYPE_STRAPI_RESULT<TYPE_DETOX> | never>(
        (i: TYPE_STRAPI_RESULT<TYPE_DETOX> | never) =>
          i?.attributes?.addiction === addiction?.name &&
          i?.attributes?.detoxified === true,
      );

    if (addiction?.name) {
      if (
        typeof isAlreadyDetoxified !== "undefined" &&
        typeof isAlreadyDetoxified?.id !== "undefined"
      ) {
        handleDelete(isAlreadyDetoxified?.id);
      } else {
        handleQuery("POST", {
          body: {
            addiction: addiction?.name,
            detoxified: !isDetoxified,
            date: date.format("YYYY-MM-DD"),
          },
          onSuccess: (i: TYPE_STRAPI_RESULT<TYPE_DETOX>) => {
            if (i?.id) {
              dispatch(
                addStoreItem({
                  key: QUERY_IDS.DETOX_ITEMS,
                  value: i,
                }),
              );
            }
          },
        });
      }
    }
  };

  const handleDelete = (id: number) => {
    handleQueryDetoxDelete("DELETE", {
      body: {
        id,
      },
      onSuccess: () => {
        try {
          dispatch(
            removeStoreItem({
              key: QUERY_IDS.DETOX_ITEMS,
              value: id,
            }),
          );
        } catch (err) {
          console.log("err", err);
        }
      },
    });
  };

  const onPress = () => {
    const destructiveButtonIndex = -1;
    const cancelButtonIndex = options.length - 1;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex: number | undefined) => {
        if (
          typeof selectedIndex !== "undefined" &&
          selectedIndex !== cancelButtonIndex
        ) {
          handleSave(selectedIndex);
        }
      },
    );
  };

  return {
    onPress,
    handleDelete,
    handleSave,
    detoxDay,
    isDetoxified,
    isLoading,
    isLoadingDetoxDelete,
    handleQueryDetoxDelete,
    detoxIgnored,
    noAddiction: detoxIgnored.length === ADDICTIONS.length,
  };
};
