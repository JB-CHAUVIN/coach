const { getUser, isUserCoachAndInClub } = require("../../../utils/user");

const validateUser = async (ctx) => {
  const { user } = ctx.state;
  const { userToValidateId, validate = false } = ctx.request.body?.data;

  const theUser = await getUser(user?.id);
  const theUserToValidate = await getUser(userToValidateId);

  if (!isUserCoachAndInClub(theUser)) {
    return ctx.badRequest(null, "You are not a coach in a club");
  }

  if(theUser?.club?.id != theUserToValidate?.club?.id) {
    return ctx.badRequest(null, "You are not in the same club");
  }

  // update user
  await strapi.entityService.update("plugin::users-permissions.user", userToValidateId, {
    data: {
      pendingJoinClub: validate ? false : true,
    }
  });

  return ctx.send({
    message: `User ${validate ? "validated" : "refused"}`,
  });
};

module.exports = {
  validateUser,
};
