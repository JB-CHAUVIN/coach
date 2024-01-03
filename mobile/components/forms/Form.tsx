import React, { Children, Dispatch, useRef, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import { SIZES } from "../../constants/sizes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import KeyboardSpacer from "react-native-keyboard-spacer";

interface FormI<T> {
  children: React.ReactNode;
  form: T;
  setForm: Dispatch<any>;
}

export interface InputI<T> {
  id: string;
  setValue?: (value: T) => void;
  value?: T;
  icon?: any;
  isInputValid?: boolean;
  validation?: (value: T) => boolean;
}

export const Form = <T extends unknown>(p: FormI<T>) => {
  const { children = <View />, form, setForm } = p || {};

  let isFormValid = true;

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
      const id = child?.props?.id;
      // @ts-ignore
      const validation = child?.props?.validation;

      const isInputValidFn = (formValue: any) => {
        // Is input valid
        let res = true;
        if (typeof validation === "function") {
          res = !!validation(formValue);
        }

        if (!res && id !== "submit") {
          // one input not valid, then form is not valid
          isFormValid = false;
        }

        return res;
      };

      // @ts-ignore
      const formValue = form?.[id];
      const isInputValid = isInputValidFn(formValue);

      // @ts-ignore
      return React.cloneElement(child, {
        // @ts-ignore
        setValue: (value: unknown) => setValue(child?.props?.id, value),
        // @ts-ignore
        value: form?.[child?.props?.id],
        isFormValid,
        // @ts-ignore
        isInputValid,
      });
    });
  };

  return (
    <ScrollView style={s.container}>
      {renderChildren()}
      <KeyboardSpacer />
    </ScrollView>
  );
};

export const s = StyleSheet.create({
  container: {
    margin: SIZES.PADDING_PAGE,
  },
});
