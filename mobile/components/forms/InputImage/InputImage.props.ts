import { InputI } from "../Form";

export interface InputImageI<T> extends InputI<T> {
  placeholder?: string;
  defaultUrl?: string | null,
}
