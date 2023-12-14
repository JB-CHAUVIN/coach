import React, { Children, Dispatch } from "react";
import { View, Text, ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import { SIZES } from "../../constants/sizes";

interface FormI<T> {
  children: React.ReactNode;
  form: T;
  setForm: Dispatch<any>;
}

export interface InputI<T> {
  id: string;
  setValue?: (value: T) => void;
  value?: T;
}

export const Form = <T extends unknown>(p: FormI<T>) => {
  const { children = <View />, form, setForm } = p || {};

  /**
   * Callbacks / handles
   */
  const setValue = (id: string, value: unknown) => {
    // @ts-ignore
    setForm((prev) => {
      const oldValues = typeof prev === "object" ? prev : {};
      return {
        ...oldValues,
        [id]: value,
      };
    });
  };

  /**
   * Renders
   */
  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      // @ts-ignore
      return React.cloneElement(child, {
        // @ts-ignore
        setValue: (value: unknown) => setValue(child?.props?.id, value),
        // @ts-ignore
        value: form?.[child?.props?.id],
      });
    });
  };

  return <ScrollView style={s.container}>{renderChildren()}</ScrollView>;
};

export const s = StyleSheet.create({
  container: {
    margin: SIZES.PADDING_PAGE,
  },
});
