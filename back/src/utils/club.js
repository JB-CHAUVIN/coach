const getClub = async (id) => {
  const theClub = await strapi.entityService.findOne("api::club.club",  id, {
    populate: ["logo"],
  });

  return theClub;
}

module.exports = {
  getClub,
}
