/* ============================================================================
 * Verify auth-token
 * ========================================================================= */
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

/* ============================================================================
 * Express middleware function
 * ========================================================================= */
module.exports = (req, res, next) => {

  const token = req.header('auth-token');

  if (!token) {
    return res
      .status(401)
      .json('Access Denied');
  }

  try {

    // Verify token
    req.user = jwt.verify(token, SECRET);

    next();

  } catch (error) {

    console.log(error);
    return res
      .status(400)
      .json('Invalid Token');

  }

}