import { EVENTS_TYPES } from "../../../../../constants/_features/events/eventsTypes";

export const getEventByType = (type: string) => {
  for (let i in EVENTS_TYPES) {
    const event = EVENTS_TYPES[i];
    if (event.value === type) {
      return event as any;
    }
  }

  return null;
};
