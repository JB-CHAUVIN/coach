import React from "react";
import { Text as TextRN, TextProps } from "react-native";
import { StyleSheet } from "react-native";
import {FONTS} from "../../constants/fonts";

export const Text = (p: TextProps) => {
  return <TextRN {...p} style={[s.text, p?.style]} />;
};

export const s = StyleSheet.create({
  text: {
    fontFamily: FONTS.Regular,
    fontSize: 16,
  },
});
