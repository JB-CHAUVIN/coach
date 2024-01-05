const { getUser } = require("../../../utils/user");
const joinClub = async (ctx) => {
  const { user } = ctx.state;
  const { clubId = 0 } = ctx?.request?.body?.data || {};

  const club = await strapi.entityService.findOne("api::club.club", clubId);
  const theUser = await getUser(user?.id);

  if (!club?.id) {
    throw new Error("Club not found");
  }

  if (theUser?.club?.id) {
    throw new Error("User already in a club");
  }

  console.log(club);
  // update club with new user
  await strapi.entityService.update("api::club.club", club?.id, {
    data: {
      users: {
        connect: [user?.id],
      },
    }
  });

  // set user has pending
  await strapi.entityService.update("plugin::users-permissions.user", user?.id, {
    data: {
      pendingJoinClub: true,
    }
  });

  ctx.response.status = 200;
  ctx.response.body = {
    ok: true,
  };
};

module.exports = {
  joinClub,
};
