import { InputI } from "../Form";
export interface InputSelectI<T> extends InputI<T> {
  options: Array<T>;
  onSelect?: (item: T) => void;
  horizontal?: boolean;
  keepOpen?: boolean;
  placeholder?: string;
}

export type TYPE_SELECT_ITEMS = Array<{
  label: string;
  value: string;
}>;
