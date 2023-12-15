export type TYPE_EVENTS = {
    date: Date;
    time: "matin" | "midi" | "apres-midi" | "soir";
    seance: "footing" | "renforcement" | "sl" | "tempo" | "piste";
    seance_variation: string;
}
