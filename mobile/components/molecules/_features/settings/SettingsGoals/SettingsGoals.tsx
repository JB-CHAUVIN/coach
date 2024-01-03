import React from "react";
import { SettingsGoalsI } from "./SettingsGoals.props";
import { View, TextInput } from "react-native";
import { s } from "./SettingsGoals.styles";
import { PHRASES } from "../../../../../constants/phrases";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import seances from "../../../../.././constants/_features/events/eventsTypes.json";
import { COLORS } from "../../../../../constants/colors";
import { useAppDispatch, useAppSelector } from "../../../../../store/store";
import {setGoal, setSetting} from "../../../../../store/slices/settingsSlice";
import { Text } from "../../../../atoms/Text";

export const SettingsGoals = (p: SettingsGoalsI) => {
  const goals = useAppSelector((s) => s?.settings?.goals);
  const dispatch = useAppDispatch();

  const renderSeances = () => {
    let res = [];
    for (const [key, value] of Object.entries(seances)) {

      res.push(
        <View style={s.containerGoal}>
          <Text>{value.label + " " + value.emoji}</Text>
          <TextInput
            value={(goals?.[value?.value] || "").toString()}
            onChangeText={(text) =>
              dispatch(
                setGoal({ key: value?.value, value: text.replace(/\D/g, "") }),
              )
            }
            keyboardType={"numeric"}
            selectionColor={COLORS.secondary}
            cursorColor={COLORS.text}
            style={s.inputGoal}
          />
        </View>,
      );
    }

    return res;
  };

  return (
    <View>
      <Text style={s.textTitle}>
        {PHRASES.FR.GOALS}{" "}
        <MaterialCommunityIcons
          style={s.iconGoal}
          name={"calendar-check-outline"}
        />
      </Text>
      <Text style={s.textDesc}>
        {PHRASES.FR.GOALS_DESC}
      </Text>

      {renderSeances()}
    </View>
  );
};
