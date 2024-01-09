import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { TYPE_STRAPI_RESULT } from "../../../../../types/_Strapi";
import { TYPE_CLUB } from "../../../../../types/Club";
import { useAppSelector } from "../../../../store/store";
import { SELECTOR_CLUBS_QUERY } from "../../../../store/selectors/selectorClubs";
import { getImageUrl } from "../../../../hooks/useQuery";

type ClubLogoProps = {
  style?: any;
  children?: React.ReactNode;
};

const ClubLogoNonMemo: React.FC<ClubLogoProps> = (p) => {
  const { style, children } = p || {};

  const club: TYPE_STRAPI_RESULT<TYPE_CLUB> =
    useAppSelector(SELECTOR_CLUBS_QUERY);
  const logoUrl = club?.attributes?.logo?.data?.attributes?.url;

  if (!logoUrl) {
    return children || <View />;
  }

  return (
    <View>
      <Image
        source={{ uri: getImageUrl(logoUrl) }}
        resizeMode={"contain"}
        style={[s.image, style]}
      />
    </View>
  );
};

const s = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    borderWidth: 0.2,
    borderRadius: 10,
  },
});

export const ClubLogo = React.memo(ClubLogoNonMemo, () => true);
