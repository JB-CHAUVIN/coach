import {TYPE_USER} from "./User";

export type TYPE_DETOX = {
    id: number;
    addiction: "alcohol" | "drugs" | "tobbaco";
    date: Date;
    detoxified: boolean;
    user: TYPE_USER;
}
