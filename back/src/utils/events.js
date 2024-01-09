const getEventsByClubId = async (clubId, filters) => {
  const filtersClubEvents = {
    club: {
      id: clubId,
    },
    ...filters
  };

  const clubEvents = await strapi.entityService.findMany("api::event.event", {
    filters: filtersClubEvents,
    populate: {
      club: {
        populate: {
          logo: true,
        }
      },
    },
    sort: ["date:asc"],
  });

  return clubEvents;
};

module.exports = {
  getEventsByClubId,
}
