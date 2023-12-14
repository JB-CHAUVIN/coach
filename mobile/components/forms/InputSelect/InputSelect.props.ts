import { InputI } from "../Form";

export interface InputSelectI<T> extends InputI<T> {
    options: Array<T>,
    onSelect?: (item: T) => void;
    horizontal?: boolean;
    placeholder?: string;
}
