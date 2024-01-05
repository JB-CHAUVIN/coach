import React from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getAddictionByName } from "../../../../../constants/_features/addictions/addictions";
import moment from "moment";
import { TYPE_STRAPI_RESULT } from "../../../../../../types/_Strapi";
import { TYPE_DETOX } from "../../../../../../types/Detox";
import { s } from "./AgendaDayAddiction.styles";
import { useAgendaDayAddiction } from "./AgendaDayAddiction.hooks";
import {useAppSelector} from "../../../../../store/store";

type AgendaDayAddictionProps = {
  date: moment.Moment;
};

const AgendaDayAddiction: React.FC<AgendaDayAddictionProps> = (p) => {
  const { date } = p || {};
  const isCoach = useAppSelector((s) => s?.user?.isCoach);

  const {
    onPress,
    handleDelete,
    handleSave,
    detoxDay,
    isDetoxified,
    isLoading,
    isLoadingDetoxDelete,
    noAddiction,
  } = useAgendaDayAddiction(date);

  if (noAddiction || isCoach) {
    return null;
  }

  return (
    <View style={s.containerAddiction}>
      {!isLoadingDetoxDelete ? (
        detoxDay.map((i: TYPE_STRAPI_RESULT<TYPE_DETOX>) => {
          const addictionName = i?.attributes?.addiction;
          const addiction = getAddictionByName(addictionName);
          return (
            <TouchableOpacity
              onPress={() => handleDelete(i?.id)}
              style={s.buttonAddiction}
            >
              <MaterialCommunityIcons
                style={s.iconAddiction}
                name={
                  addiction?.icon as keyof typeof MaterialCommunityIcons.glyphMap
                }
              />
            </TouchableOpacity>
          );
        })
      ) : (
        <ActivityIndicator style={s.buttonAddiction} />
      )}

      <TouchableOpacity onPress={onPress} disabled={isLoading}>
        <View
          style={[
            s.container,
            !isDetoxified && s.containerNotDetoxified,
            isDetoxified && s.containerDetoxified,
          ]}
        >
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <MaterialCommunityIcons
              color={isDetoxified ? s.iconDetoxified.color : "grey"}
              name={"calendar-heart"}
              size={30}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export { AgendaDayAddiction };
