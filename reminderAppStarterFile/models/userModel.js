// Contain sessionID and userID, sessionID is key and userID is value.
const userObject = {}

// const userModel = {
//   findOne: (email) => {
//     const user = loginDatabase.find((user) => user.email === email);
//     if (user) {
//       return user;
//     }
//     throw new Error(`Couldn't find user with email: ${email}`);
//   },
//   findById: (id) => {
//  const user = loginDatabase.find((user) => user.id === id);
//     if (user) {
//       return user;
//     }
//     throw new Error(`Couldn't find user with id: ${id}`);
//   },
//   findGithubId: (profile) => {
//     const user = loginDatabase.find((user) => user.id === profile.id);
//     if (user) {
//       return user;
//     }
//     loginDatabase.push({"id": profile.id, "name": profile.username, "email": profile.email, "pic": profile.photos[0].value})
//     const GitHubUser = userModel.findById(profile.id)
//     return GitHubUser

//   },
//   findAdmin: (id) => {
//     const user = loginDatabase.find((user) => user.id === id);
//     if (user) {
//       return user;
//     }
//     throw new Error(`You are not admin user: ${id}`)
//   }
// };

module.exports = userObject;
