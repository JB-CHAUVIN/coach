import React, { Children, Dispatch, useRef, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import { SIZES } from "../../constants/sizes";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface FormI<T> {
  children: React.ReactNode;
  form: T;
  setForm: Dispatch<any>;
}

export interface InputI<T> {
  id: string;
  setValue?: (value: T) => void;
  value?: T;
  icon?: any,
  isInputValid?: boolean,
}

export const Form = <T extends unknown>(p: FormI<T>) => {
  const { children = <View />, form, setForm } = p || {};

  const fields = useRef({});

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

      if (id && id !== 'submit') {
        // @ts-ignore
        fields.current[id] = true;
      }

      let isFormValid = true;
      for(let i in fields.current) {
        // @ts-ignore
        if (typeof form?.[i] === 'undefined') {
          isFormValid = false;
        }
      }

      // @ts-ignore
      return React.cloneElement(child, {
        // @ts-ignore
        setValue: (value: unknown) => setValue(child?.props?.id, value),
        // @ts-ignore
        value: form?.[child?.props?.id],
        isFormValid,
        // @ts-ignore
        isInputValid: typeof form?.[id] !== 'undefined',
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
