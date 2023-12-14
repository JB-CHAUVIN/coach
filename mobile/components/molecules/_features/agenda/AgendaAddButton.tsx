import React from "react";
import { View, Text } from "react-native";

import { StyleSheet } from "react-native";
import { Button } from "../../../atoms/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {useSelector} from "react-redux";
import {useAppSelector} from "../../../../store/store";
import {useNavigation} from "expo-router";

type AgendaAddButtonProps = {};

const AgendaAddButton: React.FC<AgendaAddButtonProps> = (p) => {
  const {} = p || {};

  const currentDate = useAppSelector(s => s?.agenda?.currentDate);
  const navigation =  useNavigation();

  return (
    <View>
      <Button style={s.button} onPress={() => navigation.navigate('modal-agenda-add')}>
        <MaterialCommunityIcons name="calendar-plus" size={30} />
      </Button>
    </View>
  );
};

export const s = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    // shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
  },
});

export { AgendaAddButton };
