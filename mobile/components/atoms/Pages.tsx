import React, { useRef } from "react";
import Swiper from "react-native-swiper";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "./Text";
import { FONTS } from "../../constants/fonts";
import { COLORS } from "../../constants/colors";
import { SIZES } from "../../constants/sizes";

type PagesI = {
  children: React.ReactNode;
  sectionsName?: string[];
};

export const Pages = (p: PagesI) => {
  const { children, sectionsName = [] } = p || {};

  const [index, setIndex] = React.useState(0);
  const [activeSection, setActiveSection] = React.useState(0);
  const refPaging = useRef(null);

  const onIndexChanged = (index: number) => {
    setActiveSection(index);
  };

  return (
    <View style={s.container}>
      <View style={[s.containerSections]}>
        {sectionsName.map((sectionName) => {
          const sectionIndex = sectionsName.indexOf(sectionName);
          const isSelected = activeSection === sectionIndex;
          const onPress = () => {
            console.log(sectionIndex);
          };

          return (
            <TouchableOpacity
              onPress={onPress}
              disabled={true}
              style={[s.buttonSections, isSelected && s.buttonSectionsSelected]}
            >
              <Text style={s.textSection}>{sectionName}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Swiper
        ref={refPaging}
        activeDotColor={COLORS.primary}
        index={index}
        onIndexChanged={onIndexChanged}
      >
        {children}
      </Swiper>
    </View>
  );
};

const borderRadius = 10;
const padding = 2;

const s = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerSections: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#e1e1e1",
    borderRadius: borderRadius,
    padding: padding,
    margin: SIZES.PADDING_PAGE,
  },

  // text
  textSection: {
    fontFamily: FONTS.SemiBold,
    color: COLORS.text,
  },

  // buttons
  buttonSectionsSelected: {
    backgroundColor: "#fff",
  },

  buttonSections: {
    borderRadius: borderRadius - padding,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    flexGrow: 1,
    marginHorizontal: 1,
  },
});
