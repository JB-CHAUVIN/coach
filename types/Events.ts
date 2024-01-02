export type TYPE_EVENTS = {
    id: number;
    date: Date;
    time: "matin" | "midi" | "apres-midi" | "soir";
    seance: "footing" | "renforcement" | "sl" | "tempo" | "piste";
    seance_variation: string;
    done: boolean;
    stravaFlaggedAuto?: boolean;
    distance?: number;
    description?: string;
    fake?: boolean;
}
