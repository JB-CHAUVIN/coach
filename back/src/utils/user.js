const isUserCoachAndInClub = (user) => {
  return !!(user?.role2 === 'coach' && user?.club?.id)
}

const getUser = async (id) => {
  const theUser = await strapi.entityService.findOne("plugin::users-permissions.user",  id, {
    populate: ["club"],
  });

  return theUser;
}

module.exports = {
  getUser,
  isUserCoachAndInClub,
}
