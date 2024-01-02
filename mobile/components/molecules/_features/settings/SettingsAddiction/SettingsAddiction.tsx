import React from "react";
import { View } from "react-native";
import { s } from "./SettingsAddiction.styles";
import { SettingsAddictionProps } from "./SettingsAddiction.props";
import { Text } from "../../../../atoms/Text";
import { PHRASES } from "../../../../../constants/phrases";
import ADDICTIONS from "../../../../../constants/_features/addictions/additionsTypes.json";
import { TYPE_ADDICTION_ITEM } from "../../../../../constants/_features/addictions/addictions";
import { SettingsAddictionItem } from "./SettingsAddictionItem";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SettingsAddiction: React.FC<SettingsAddictionProps> = (p) => {
  const {} = p || {};

  return (
    <View>
      <Text style={s.textTitle}>
        {PHRASES.FR.ADDICTION_CONTROL}{" "}
        <MaterialCommunityIcons style={s.iconAddiction} name={"calendar-heart"} />
      </Text>

      <Text style={s.textDesc}>{PHRASES.FR.ADDICTION_CONTROL_DESC}</Text>

      {ADDICTIONS.map((i: TYPE_ADDICTION_ITEM) => {
        return (
          <View>
            <SettingsAddictionItem i={i} />
          </View>
        );
      })}
    </View>
  );
};

export { SettingsAddiction };
