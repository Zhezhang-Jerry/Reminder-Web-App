const userModel = require("../models/userModel").userModel;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

const isUserValid = (user, password) => {
  return user.password === password;
}

const getUserByGitHubIdOrCreate = (profile) => {
  let user = userModel.findGithubId(profile);
  if (user) {
    if (isUserValid(user)) {
      return user;
    }
  }
  return null;
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  getUserByGitHubIdOrCreate,
};