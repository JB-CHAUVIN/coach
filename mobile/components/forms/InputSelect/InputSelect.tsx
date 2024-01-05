import React, { useEffect, useRef, useState } from "react";
import { InputSelectI } from "./InputSelect.props";
import { View, TouchableOpacity, FlatList, Dimensions } from "react-native";
import { s } from "./InputSelect.styles";
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
    icon: iconProp,
    isInputValid = false,
    keepOpen = false,
  } = p || {};

  const isFirstLoad = useRef(true);

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

  /**
   * Default value init;
   */
  useEffect(() => {
    if (value && setValue && isFirstLoad.current === true) {
      const theValue =
        (options && options.find((o) => o.value === value.value)) || value;
      handleSelect(theValue);
      isFirstLoad.current = false;
    }
  }, []);

  // @ts-ignore
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
              s.icon,
              s.iconSelectedOption,
              item?.color ? { color: item?.color } : {},
            ]}
            name={item?.icon?.name}
          />
        ) : null}
      </TouchableOpacity>
    );
  };

  if (!options || options.length === 0) {
    return null;
  }

  let icon = <MaterialCommunityIcons style={s.icon} name={iconProp} />;

  if (!iconProp || (value && value?.icon?.name)) {
    icon = <View />;
  }

  let isOpen = open;
  if(keepOpen && !value) {
    isOpen = true;
  }

  return (
    <TouchableOpacity
      style={[
        s.button,
        isOpen ? { height: undefined } : {},
        isInputValid && s.buttonValid,
      ]}
      onPress={() => setOpen(true)}
    >
      {!isOpen && value
        ? renderItem({ item: { ...value, isSelected: true } })
        : null}

      {!isOpen && !value && placeholder ? (
        <Text style={s.textPlaceholder}>{placeholder}</Text>
      ) : null}

      {isOpen ? (
        <FlatList
          horizontal={horizontal}
          data={options}
          renderItem={renderItem}
          contentContainerStyle={[
            s.containerListSelect,
            horizontal && s.containerListSelectHorizontal,
          ]}
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
      ) : (
        icon
      )}
    </TouchableOpacity>
  );
};
