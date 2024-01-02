import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  addictionTranslate,
  TYPE_ADDICTION_ITEM,
} from "../../../../../constants/_features/addictions/addictions";
import Checkbox from "expo-checkbox";
import { useAppDispatch, useAppSelector } from "../../../../../store/store";
import { setSetting } from "../../../../../store/slices/settingsSlice";
import { Text } from "../../../../atoms/Text";
import {COLORS} from "../../../../../constants/colors";

type SettingsAddictionItemProps = {
  i: TYPE_ADDICTION_ITEM;
};

const SettingsAddictionItem: React.FC<SettingsAddictionItemProps> = (p) => {
  const { i } = p || {};

  const dispatch = useAppDispatch();

  const settingsAddiction = useAppSelector(
    (s) => s?.settings?.ignoredAddictions,
  );
  // @ts-ignore
  const isIgnored = settingsAddiction?.includes(i?.name);

  const toggleAddiction = () => {
    let newSettings = settingsAddiction;
    const newSettingIsIgnored = !isIgnored;
    if (newSettingIsIgnored) {
      // @ts-ignore
      newSettings = newSettings.concat(i?.name);
    } else {
      // @ts-ignore
      newSettings = newSettings.filter((i) => i === i?.name);
    }

    dispatch(
      setSetting({
        key: "ignoredAddictions",
        value: newSettings,
      }),
    );
  };

  return (
    <TouchableOpacity style={s.container}>
      <Checkbox
        value={!isIgnored}
        onValueChange={toggleAddiction}
        style={s.checkbox}
        color={COLORS.primary}
      />

      <MaterialCommunityIcons
        name={i?.icon as keyof typeof MaterialCommunityIcons.glyphMap}
        style={s.icon}
      />

      <Text>{addictionTranslate(i?.name)}</Text>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  // container
  container: {
    flexDirection: "row",
    marginVertical: 5,
    paddingVertical: 4,
  },

  // checkbox
  checkbox: {
    marginRight: 10,
  },

  // icons
  icon: {
    fontSize: 25,
    color: "grey",
    marginRight: 10,
  },
});

export { SettingsAddictionItem };
