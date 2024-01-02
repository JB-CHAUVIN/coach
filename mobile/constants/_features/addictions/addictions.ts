import { PHRASES } from "../../phrases";
import ADDICTIONS from "./additionsTypes.json";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export type TYPE_ADDICTION_ITEM = {
  name: string;
  icon: string | keyof typeof MaterialCommunityIcons.glyphMap;
};

export const addictionTranslate = (name: string) => {
  // @ts-ignore
  return (PHRASES.FR?.[name] as string) || "?";
};

export const getAddictionByName = (name: string) : TYPE_ADDICTION_ITEM | undefined => {
  return ADDICTIONS.find((a) => a.name === name);
};

export const getAddictionByIndex = (id: number) => {
  return ADDICTIONS?.[id];
};
