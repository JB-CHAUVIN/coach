import { InputI } from "../Form";

export interface InputSubmitI<T> extends InputI<T> {
    onPress: () => void;
    isLoading: boolean;
    isFormValid?: boolean;
    label?: string;
    style?: any;
}
