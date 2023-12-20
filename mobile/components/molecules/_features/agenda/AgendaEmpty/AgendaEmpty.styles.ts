import { StyleSheet } from 'react-native';
import {SIZES} from "../../../../../constants/sizes";
import {COLORS} from "../../../../../constants/colors";

export const s = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: SIZES.PADDING_PAGE,
    },

    text: {
        textAlign: "center",
        color: COLORS.text,
    }
});