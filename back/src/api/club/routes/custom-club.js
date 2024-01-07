module.exports = {
  routes: [
    {
      method: "PUT",
      path: "/club/join",
      handler: "club.joinClub",
    },
    {
      method: "POST",
      path: "/club/validate-user",
      handler: "club.validateUser",
    },
  ],
};
