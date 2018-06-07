module.exports = (req, res, next) => {
  if (!req.session.user) {
    return res.status(403).send("No user found");
  }
  next();
};
