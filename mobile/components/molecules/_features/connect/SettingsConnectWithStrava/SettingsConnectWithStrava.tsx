import React from "react";
import { SettingsConnectWithStravaI } from "./SettingsConnectWithStrava.props";
import { Image, TouchableOpacity, View } from "react-native";
import { s } from "./SettingsConnectWithStrava.styles";
import { Text } from "../../../../atoms/Text";
import { PHRASES } from "../../../../../constants/phrases";
import { useLoginWithStrava } from "./SettingsConnectWithStrava.hooks";

const logoStrava = require("../../../../../assets/images/_features/connect/logo-strava-white.png");

export const SettingsConnectWithStrava = (p: SettingsConnectWithStravaI) => {
  const { handleLoginWithStrava } = useLoginWithStrava();

  return (
    <View>
      <Text style={s.textTitle}>{PHRASES.FR.CONNECT_WITH_STRAVA}</Text>
      <Text style={s.textDesc}>{PHRASES.FR.CONNECT_WITH_STRAVA_DESC}</Text>
      <TouchableOpacity
        style={s.button}
        onPress={() => handleLoginWithStrava()}
      >
        <Image
          source={logoStrava}
          style={s.imageStrava}
          resizeMode={"contain"}
        />
      </TouchableOpacity>
    </View>
  );
};
