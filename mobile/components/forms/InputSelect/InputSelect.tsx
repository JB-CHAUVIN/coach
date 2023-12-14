import React, { useState } from "react";
import { InputSelectI } from "./InputSelect.props";
import { View, TouchableOpacity, FlatList, Dimensions } from "react-native";
import { s } from "./InputSelect.styles.ts";
import { Text } from "../../atoms/Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SCREEN_WIDTH, SIZES } from "../../../constants/sizes";

export const InputSelect = (p: InputSelectI<any>) => {
  const {
    options,
    setValue,
    value,
    onSelect,
    horizontal = false,
    placeholder,
  } = p || {};

  const [open, setOpen] = useState(false);

  const handleSelect = (item: any) => {
    if (onSelect && item) {
      onSelect(item);
    }

    setOpen(false);
    if (item && setValue) {
      setValue(item);
    }
  };
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[
          s.buttonSelectOption,
          horizontal && !item?.isSelected && s.buttonSelectOptionHorizontal,
          horizontal &&
            !item?.isSelected && {
              width: (SCREEN_WIDTH - SIZES.PADDING_PAGE * 2) / options.length,
            },
        ]}
        onPress={() => handleSelect(item)}
        disabled={item?.isSelected === true}
      >
        <Text
          style={[
            s.textSelectOption,
            horizontal && !item?.isSelected && s.textSelectOptionHorizontal,
            item?.color ? { color: item?.color } : {},
          ]}
        >
          {item?.label}
        </Text>
        {item?.icon ? (
          <MaterialCommunityIcons
            style={[
              s.iconSelectedOption,
              item?.color ? { color: item?.color } : {},
            ]}
            name={item?.icon?.name}
          />
        ) : null}
      </TouchableOpacity>
    );
  };

  if(!options || options.length === 0) {
    return null;
  }

  return (
    <TouchableOpacity
      style={[s.button, open ? { height: undefined } : {}]}
      onPress={() => setOpen(true)}
    >
      {!open && value
        ? renderItem({ item: { ...value, isSelected: true } })
        : null}

      {!open && !value && placeholder ? (
        <Text style={s.textPlaceholder}>{placeholder}</Text>
      ) : null}

      {open ? (
        <FlatList
          horizontal={horizontal}
          data={options}
          renderItem={renderItem}
          contentContainerStyle={horizontal && s.containerListSelectHorizontal}
          ItemSeparatorComponent={() => (
            <View
              style={
                horizontal
                  ? s.buttonSelectOptionSeparatorHorizontal
                  : s.buttonSelectOptionSeparator
              }
            />
          )}
          scrollEnabled={!horizontal}
        />
      ) : null}
    </TouchableOpacity>
  );
};
