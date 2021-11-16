module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/auth/login");
  },
  forwardAuthenticated: (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/reminder");
  },
  isAdmin: function(req, res, next) {
    if (req.isAuthenticated()) {
      if (req.user.role === "admin"){
        return next()
      }
      res.send("<h1>You don't have Admin Priviledges!")
    }
  }
  }
;
