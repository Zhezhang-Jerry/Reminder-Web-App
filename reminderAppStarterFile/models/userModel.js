const loginDatabase = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
  },
];

const userModel = {
  findOne: (email) => {
    const user = loginDatabase.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id) => {
    const user = loginDatabase.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
  findGithubId: (profile) => {
    const user = loginDatabase.find((user) => user.id === profile.id);
    if (user) {
      return user;
    }
    else {
      loginDatabase.push({"id": profile.id, "name": profile.name, "email": profile.email})
      const GitHubUser = userModel.findById(profile.id)
      return GitHubUser
    }
  }
};

module.exports = { loginDatabase, userModel };
