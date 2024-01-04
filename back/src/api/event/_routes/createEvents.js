const { isUserCoachAndInClub, getUser } = require("../../../utils/user");
const createEvents = async (ctx) => {
  const { user } = ctx.state;

  const theUser = await getUser(user?.id);

  if (user?.id && ctx?.request?.body?.data) {
    ctx.request.body.data.user = {
      connect: [user?.id],
    };
  }

  if (isUserCoachAndInClub(theUser)) {
    ctx.request.body.data.club = {
      connect: [theUser?.club?.id],
    };
  }
};

module.exports = {
  createEvents,
};
