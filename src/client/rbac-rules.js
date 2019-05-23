const rules = {
  visitor: {
    static: ["posts:list", "home-page:visit"]
  },
  role_guest: {
    static: [
      "posts:list",
      "posts:create",
      "users:getSelf",
      "home-page:visit",
      "dashboard-page:visit"
    ]
  },
  role_user: {
    static: [
      "posts:list",
      "posts:create",
      "users:getSelf",
      "home-page:visit",
      "dashboard-page:visit"
    ],
    dynamic: {
      "posts:edit": ({userId, postOwnerId}) => {
        if (!userId || !postOwnerId) return false;
        return userId === postOwnerId;
      }
    }
  },
  role_admin: {
    static: [
      "posts:list",
      "posts:create",
      "posts:edit",
      "posts:delete",
      "users:get",
      "users:getSelf",
      "home-page:visit",
      "dashboard-page:visit"
    ]
  }
};

export default rules;
