import React from "react";
import { Text as TextRN, TextProps } from "react-native";
import { StyleSheet } from "react-native";

export const Text = (p: TextProps) => {
  return <TextRN {...p} style={[s.text, p?.style]} />;
};

export const s = StyleSheet.create({
  text: {
    fontFamily: "UrbanistRegular",
    fontSize: 16,
  },
});
