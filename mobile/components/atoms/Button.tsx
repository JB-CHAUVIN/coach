import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from "react-native";
import { COLORS } from "../../constants/colors";

type ButtonProps = {} & TouchableOpacityProps;

const Button: React.FC<ButtonProps> = (p) => {
  const { children, style = {}, onPress = () => {} } = p || {};

  return (
    <TouchableOpacity style={[s.button, style]} onPress={onPress}>
      <Text style={s.text}>{children}</Text>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  button: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  text: {
    color: COLORS.white,
    fontSize: 14,
  },
});

export { Button };
