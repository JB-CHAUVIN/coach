import { StyleSheet } from 'react-native';
import {styleSettings} from "../styleSettings";
import {style} from "dom-helpers";
import {FONTS} from "../../../../../constants/fonts";
import {COLORS} from "../../../../../constants/colors";

export const s = StyleSheet.create({
    // containers
    containerGoal: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 5,
    },

    // text
    textTitle: {
        ...styleSettings.textTitle,
    },

    textDesc: {
        ...styleSettings.textDesc,
    },

    // icons
    iconGoal: {
        ...styleSettings.icon,
    },

    // inputs
    inputGoal: {
        width: 60,
        height: 30,
        padding: 4,
        fontFamily: FONTS.Regular,
        borderWidth: 1,
        borderColor: 'rgba(37,37,37,0.51)',
        borderRadius: 6,
        color: COLORS.text,
    },
});