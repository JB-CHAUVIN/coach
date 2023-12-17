interface EventVariation {
  label: string;
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
}

interface EventsTypes {
  [key: string]: EventType;
}

export const EVENTS_TYPES: EventsTypes = {
  FOOTING: {
    label: "Footing",
    value: "footing",
    variations: [
      { label: "Endurance fondamentale" },
      { label: "Récupération" },
      { label: "Actif" },
      { label: "Progressif" },
      { label: "Avec variations de dénivelé" },
      { label: "Aux sensations" },
    ],
    color: "#41943a",
    icon: {
      name: "run",
      type: "MaterialCommunityIcons",
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
  },
  SL: {
    label: "Sortie longue",
    value: "sl",
    variations: [
      { label: "Avec variations d'allure" },
      { label: "Lente" },
      { label: "Avec variations de dénivelé" },
      { label: "Aux sensations" },
    ],
    color: "#de7e31",
    icon: {
      name: "clock-outline",
      type: "MaterialCommunityIcons",
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
  },
};
