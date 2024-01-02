import {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { s } from "./AgendaHeader.styles";
import { SIZES } from "../../../../../constants/sizes";
import { useState } from "react";

export const useAgendaHeaderAnimated = () => {
  const isOpen = useSharedValue(0);
  const [openAnalysis, setIsOpenAnalysis] = useState(false);
  const [openStats, setOpenStats] = useState(false);

  const extrapolation = Extrapolation.CLAMP;

  const container = useAnimatedStyle(() => {
    return {
      height: interpolate(isOpen.value, [0, 1], [136, openAnalysis ? 480 : 290], extrapolation),
    };
  });

  const buttonOpen = useAnimatedStyle(() => {
    return {
      marginLeft: -1 * SIZES.PADDING_PAGE,
      marginRight: -1 * SIZES.PADDING_PAGE,
      borderBottomRightRadius: interpolate(
        isOpen.value,
        [0, 0.1],
        [0, 0],
        extrapolation,
      ),
      borderBottomLeftRadius: interpolate(
        isOpen.value,
        [0, 0.1],
        [0, 0],
        extrapolation,
      ),
      borderTopRightRadius: interpolate(
        isOpen.value,
        [0, 0.1],
        [0, 90],
        extrapolation,
      ),
      borderTopLeftRadius: interpolate(
        isOpen.value,
        [0, 0.1],
        [0, 90],
        extrapolation,
      ),
    };
  });

  const handleToggle = () => {
    setOpenStats(false);
    setIsOpenAnalysis(!openAnalysis);
  };

  const handleToggleStats = () => {
    setIsOpenAnalysis(false);
    setOpenStats(!openStats);
  };

  useDerivedValue(() => {
    isOpen.value = withTiming(openAnalysis || openStats ? 1 : 0);
  }, [openAnalysis, openStats]);

  return {
    handleToggle,
    buttonOpen,
    container,
    isOpen,
    openAnalysis,
    openStats,
    handleToggleStats,
  };
};
