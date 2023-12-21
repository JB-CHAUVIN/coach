import React from "react";
import { SettingsConnectWithStravaI } from "./SettingsConnectWithStrava.props";
import { ActivityIndicator, Image, TouchableOpacity, View } from "react-native";
import { s } from "./SettingsConnectWithStrava.styles";
import { Text } from "../../../../atoms/Text";
import { PHRASES } from "../../../../../constants/phrases";
import { useLoginWithStrava } from "./SettingsConnectWithStrava.hooks";

const logoStrava = require("../../../../../assets/images/_features/connect/logo-strava-white.png");

export const SettingsConnectWithStrava = (p: SettingsConnectWithStravaI) => {
  const {
    handleLoginWithStrava,
    isLoading,
    handleRemoveStravaToken,
    isLoggedInWithStava,
  } = useLoginWithStrava();

  const renderButtonContent = () => {
    if (isLoggedInWithStava) {
      return (
        <View style={s.containerDisableStrava}>
          <Image
            source={logoStrava}
            style={s.imageStravaDisable}
            resizeMode={"contain"}
          />
          <Text style={s.textButtonDisable}>{PHRASES.FR.DISABLE_STRAVA}</Text>
        </View>
      );
    }

    return (
      <Image source={logoStrava} style={s.imageStrava} resizeMode={"contain"} />
    );
  };

  return (
    <View>
      <Text style={s.textTitle}>
        {!isLoggedInWithStava
          ? PHRASES.FR.CONNECT_WITH_STRAVA
          : PHRASES.FR.CONNECT_WITH_STRAVA_OK}
      </Text>
      <Text style={s.textDesc}>
        {!isLoggedInWithStava
          ? PHRASES.FR.CONNECT_WITH_STRAVA_DESC
          : PHRASES.FR.CONNECT_WITH_STRAVA_DESC_OK}
      </Text>
      <TouchableOpacity
        style={s.button}
        onPress={!isLoggedInWithStava ? handleLoginWithStrava : handleRemoveStravaToken}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          renderButtonContent()
        )}
      </TouchableOpacity>
    </View>
  );
};
