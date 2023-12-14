import React from "react";
import { InputSubmitI } from "./InputSubmit.props";
import { View, Text, TouchableOpacity } from "react-native";
import { s } from "./InputSubmit.styles.ts";
import { PHRASES } from "../../../constants/phrases";

export const InputSubmit = (p: InputSubmitI) => {
  return (
    <TouchableOpacity style={s.button}>
      <Text style={s.text}>{PHRASES.FR.PLACEHOLDER_FORM_SUBMIT}</Text>
    </TouchableOpacity>
  );
};
