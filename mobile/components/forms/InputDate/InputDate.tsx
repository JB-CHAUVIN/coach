import React from "react";
import { InputDateI } from "./InputDate.props";
import { View } from "react-native";
import { s } from "./InputDate.styles";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import {FORM_STYLES} from "../../../constants/formStyles";

export const InputDate = (p: InputDateI<Date>) => {
  const { setValue, value, isInputValid } = p || {};

  return (
    <View style={[s.button, isInputValid && FORM_STYLES.inputContainerValid]}>
      <View style={s.containerInput}>
        {value ? (
          <DateTimePicker
            value={value}
            onChange={(_, date) => {
              if (date && setValue) setValue(date);
            }}
          />
        ) : null}
      </View>

      <MaterialCommunityIcons name="calendar" style={s.icon} />
    </View>
  );
};
