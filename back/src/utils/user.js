const isUserCoachAndInClub = (user, clubId) => {
  let isCoachAndHasClub = !!(user?.role2 === 'coach' && user?.club?.id);
  let isUserInThisClub = typeof clubId !== 'undefined' ? user?.club?.id === clubId : true;
  return isCoachAndHasClub && isUserInThisClub;
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
