import React, { useState } from "react";
import { InputI } from "./Input.props";
import { View, TextInput, TouchableOpacity } from "react-native";
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
    isInputValid,
  } = p || {};

  const [secure, setSecure] = useState(secureTextEntry);

  let theIcon = icon;
  if (secureTextEntry && !secure) {
    theIcon = "form-textbox";
  }

  const hasValue = value && value.toString().trim().length > 0;

  return (
    <View style={[s.container, !!isInputValid && s.containerValid]}>
      {!hasValue && placeholder ? (
        <Text style={s.inputEmpty}>{placeholder}</Text>
      ) : null}

      <TextInput
        selectionColor={COLORS.secondary}
        cursorColor={COLORS.secondary}
        style={[s.input]}
        keyboardType={keyboardType}
        onChangeText={(e) => setValue && setValue(e.toString())}
        secureTextEntry={secure}
        autoCapitalize={autoCapitalize}
        value={(value || "").toString()}
        autoCorrect={false}
      />

      <TouchableOpacity
        disabled={!secureTextEntry}
        onPress={() => setSecure(!secure)}
        style={s.buttonIcon}
      >
        <MaterialCommunityIcons name={theIcon} style={s.icon} />
      </TouchableOpacity>
    </View>
  );
};
