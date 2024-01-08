import React, { useState } from "react";
import { InputImageI } from "./InputImage.props";
import { Image, TouchableOpacity, View } from "react-native";
import { s } from "./InputImage.styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PHRASES } from "../../../constants/phrases";
import { Text } from "../../atoms/Text";
import * as ImagePicker from "expo-image-picker";

export const InputImage = (p: InputImageI<any>) => {
  const {
    placeholder = PHRASES.FR.PLACEHOLDER_IMAGE,
    setValue,
    value,
    defaultUrl,
  } = p || {};

  let hasValue = value?.uri || defaultUrl;
  const imageSrc: { uri: any } = {};
  if(value?.uri) {
    imageSrc["uri"] = value?.uri;
  } else if(defaultUrl) {
    imageSrc["uri"] = defaultUrl;
  }

  const handlePickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.5,
      allowsMultipleSelection: false,
    });

    if (!result.canceled && setValue) {
      setValue(result?.assets?.[0]);
    }
  };

  const handleDelete = () => {
    setValue && setValue(null);
  };

  const placeholderValid = hasValue ? " ✔" : "";

  return (
    <TouchableOpacity
      onPress={handlePickImage}
      style={[s.container, hasValue && s.containerValid]}
    >
      <Text style={s.textPlaceholder}>{placeholder + placeholderValid}</Text>
      {hasValue ? (
        <View>
          <Image
            source={imageSrc}
            resizeMode={"contain"}
            style={s.image}
          />

          <TouchableOpacity onPress={handleDelete} style={s.buttonDelete}>
            <MaterialCommunityIcons name={"trash-can"} style={s.iconDelete} />
          </TouchableOpacity>
        </View>
      ) : (
        <MaterialCommunityIcons name={"image"} style={s.icon} />
      )}
    </TouchableOpacity>
  );
};
