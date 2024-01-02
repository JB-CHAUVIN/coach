import { StyleSheet } from 'react-native';
import {styleSettings} from "../styleSettings";
import {FONTS} from "../../../../../constants/fonts";

export const s = StyleSheet.create({
  container: {
    flex: 1,
  },

  textTitle: {
    ...styleSettings.textTitle,
  },

  textDesc: {
    ...styleSettings.textDesc,
  },

  // icons
  iconAddiction: {
    fontSize: 20,
  }
});
