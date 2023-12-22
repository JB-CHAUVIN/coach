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
  emoji: string;
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

const eventsJson = require('./eventsTypes.json');

export const EVENTS_TYPES: EventsTypes = eventsJson;
