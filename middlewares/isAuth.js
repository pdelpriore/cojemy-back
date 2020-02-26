const isAuth = (req, res, next) => {
  if (req.get("x-auth")) {
    const token = req.get("x-auth");
    //verify token with jwt
    //if token valid : req.isAuth = true
    //if not : req.isAuth = false
    next();
  } else {
    next();
  }
};

module.exports = { isAuth };
