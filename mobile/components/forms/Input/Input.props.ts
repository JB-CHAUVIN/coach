import { InputI as InputIForm } from "../Form";

export interface InputI<T> extends InputIForm<T> {
    icon?: any;
    keyboardType?: "numeric" | "default";
    placeholder?: string;
    secureTextEntry?: boolean;
    autoCapitalize?: "none" | "sentences" | "words" | "characters";
    validation?: (value: T) => boolean;
};
