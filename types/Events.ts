import {TYPE_STRAPI_POPULATE_ONE} from "./_Strapi";
import {TYPE_CLUB} from "./Club";

export type TYPE_EVENTS = {
    id: number;
    date: Date;
    time: "matin" | "midi" | "apres-midi" | "soir";
    seance: "footing" | "renforcement" | "sl" | "tempo" | "piste" | "cotes";
    seance_variation: string;
    done: boolean;
    stravaFlaggedAuto?: boolean;
    distance?: number;
    description?: string;
    fake?: boolean;
    club?: TYPE_STRAPI_POPULATE_ONE<TYPE_CLUB>
}
