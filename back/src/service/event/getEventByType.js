const EVENTS_TYPES = require("../../../../mobile/constants/_features/events/eventsTypes.json");

const getEventByType = (type) => {
    for (let i in EVENTS_TYPES) {
        const event = EVENTS_TYPES[i];
        if (event.value.toUpperCase() === type.toUpperCase()) {
            return event;
        }
    }

    return null;
};

module.exports = {
    getEventByType,
}
