interface EventVariation {
  label: string;
  ratings?: {
    force: number;
    puissance: number;
    technique: number;
    endurance: number;
    resistance: number;
  }
}

interface EventIcon {
  name: string;
  type: string;
}

interface EventType {
  label: string;
  value: string;
  variations: EventVariation[];
  color: string;
  icon: EventIcon;
  ratings?: {
    force: number;
    puissance: number;
    technique: number;
    endurance: number;
    resistance: number;
  }
}

interface EventsTypes {
  [key: string]: EventType;
}

export const EVENTS_TYPES: EventsTypes = {
  FOOTING: {
    label: "Footing",
    value: "footing",
    variations: [
      { label: "Endurance fondamentale", ratings: { force: 2, puissance: 2, technique: 2, endurance: 2, resistance: 2 } },
      { label: "Récupération", ratings: { force: 2, puissance: 2, technique: 2, endurance: 2, resistance: 2 } },
      { label: "Actif", ratings: { force: 3, puissance: 4, technique: 4, endurance: 5, resistance: 4 } },
      { label: "Progressif", ratings: { force: 2, puissance: 4, technique: 5, endurance: 5, resistance: 5 } },
      { label: "Avec variations de dénivelé", ratings: { force: 4, puissance: 5, technique: 4, endurance: 7, resistance: 7 } },
      { label: "Aux sensations", ratings: { force: 2, puissance: 2, technique: 2, endurance: 2, resistance: 2 } },
    ],
    color: "#41943a",
    icon: {
      name: "run",
      type: "MaterialCommunityIcons",
    },
    ratings: {
      force: 3,
      puissance: 2,
      technique: 4,
      endurance: 8,
      resistance: 6,
    },
  },
  RENFO: {
    label: "Renforcement",
    value: "renforcement",
    variations: [
      {
        label: "Full-body",
      },
      { label: "Haut du corps" },
      { label: "Bas du corps" },
      { label: "Abdominaux" },
      { label: "Gainage" },
      { label: "Circuit" },
      { label: "Plyométrie" },
      { label: "Proprioception" },
      { label: "Etirements" },
    ],
    color: "#943a88",
    icon: {
      name: "weight-lifter",
      type: "MaterialCommunityIcons",
    },
    ratings: {
      force: 8,
      puissance: 8,
      technique: 5,
      endurance: 4,
      resistance: 7,
    },
  },
  SL: {
    label: "Sortie longue",
    value: "sl",
    variations: [
      { label: "Avec variations d'allure", ratings: { force: 4, puissance: 3, technique: 4, endurance: 9, resistance: 8 } },
      { label: "Lente", ratings: { force: 3, puissance: 2, technique: 3, endurance: 9, resistance: 7 } },
      { label: "Avec variations de dénivelé", ratings: { force: 5, puissance: 4, technique: 4, endurance: 8, resistance: 8 } },
      { label: "Aux sensations", ratings: { force: 3, puissance: 3, technique: 5, endurance: 9, resistance: 6 } },
    ],
    color: "#de7e31",
    icon: {
      name: "clock-outline",
      type: "MaterialCommunityIcons",
    },
    ratings: {
      force: 4,
      puissance: 3,
      technique: 4,
      endurance: 9,
      resistance: 8,
    },
  },
  TEMPO: {
    label: "Tempo",
    value: "tempo",
    variations: [
      { label: "Avec variations d'allure" },
      { label: "Avec variations de dénivelé" },
      { label: "Progressif" },
    ],
    color: "#de7e31",
    icon: {
      name: "run-fast",
      type: "MaterialCommunityIcons",
    },
    ratings: {
      force: 5,
      puissance: 5,
      technique: 6,
      endurance: 7,
      resistance: 7,
    },
  },
  TRACK: {
    label: "Piste",
    value: "piste",
    variations: [{ label: "Sprint" }, { label: "Seuil" }, { label: "VMA" }],
    color: "#d01616",
    icon: {
      name: "rocket",
      type: "MaterialCommunityIcons",
    },
    ratings: {
      force: 6,
      puissance: 9,
      technique: 7,
      endurance: 5,
      resistance: 6,
    },
  },
};
