import React from "react";
import { InputI } from "./Input.props";
import { View, TextInput } from "react-native";
import { s } from "./Input.styles";
import { COLORS } from "../../../constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "../../atoms/Text";

export const Input = (p: InputI<string>) => {
  const {
    placeholder = "",
    icon,
    keyboardType = "default",
    value = "",
    setValue,
    secureTextEntry = false,
    autoCapitalize = "none",
  } = p || {};

  const hasValue = value && value.trim().length > 0;

  return (
    <View style={[s.container, !!hasValue && s.containerValid]}>
      {!hasValue && placeholder ? (
        <Text style={s.inputEmpty}>{placeholder}</Text>
      ) : null}

      <TextInput
        selectionColor={COLORS.secondary}
        cursorColor={COLORS.secondary}
        style={[s.input]}
        keyboardType={keyboardType}
        onChangeText={(e) => setValue && setValue(e.toString())}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
      />

      <MaterialCommunityIcons name={icon} style={s.icon} />
    </View>
  );
};
