import React from "react";
import { InputSubmitI } from "./InputSubmit.props";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { s } from "./InputSubmit.styles";
import { PHRASES } from "../../../constants/phrases";

export const InputSubmit = (p: InputSubmitI<any>) => {
  const { onPress, isLoading, isFormValid = false } = p;
  const disabled = isLoading || !isFormValid;

  return (
    <TouchableOpacity
      style={[s.button, disabled && s.buttonDisabled]}
      onPress={() => onPress()}
      disabled={disabled}
    >
      <Text style={s.text}>{PHRASES.FR.PLACEHOLDER_FORM_SUBMIT}</Text>
      {isLoading ? <ActivityIndicator color={s.text.color} /> : null}
    </TouchableOpacity>
  );
};
