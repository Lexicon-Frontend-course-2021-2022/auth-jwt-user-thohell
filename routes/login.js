/* ============================================================================
 * Authenticate user
 * ========================================================================= */
const route = require('express').Router();

const SECRET = process.env.SECRET;

/* ============================================================================
 * Misc. module imports
 * ========================================================================= */
const User = require('../model/User');
const validate = require('../validate').login;
const bcrypt = require('bcryptjs'); // Password hashing
const jwt = require('jsonwebtoken');

/* ============================================================================
 * Endpoints
 * ========================================================================= */
route.post('/', async (req, res) => {

  // Validate User
  const error = validate(req.body).error
  if (error) {
    return res
      .status(400)
      .json
      (
        {
          error: error.details[0].message
        }
      );
  }

  // get login user from db
  const user = await User.findOne
    (
      {
        email: req.body.email
      }
    );

  // Verify email exists in db
  if (!user) {
    return res
      .status(400)
      .json
      (
        {
          error: 'Email is not found'
        }
      );
  }

  // Verify password against stored hash
  if (!await bcrypt.compare(req.body.password, user.password)) {
    return res
      .status(400)
      .json
      (
        {
          error: 'Invalid password'
        }
      );
  }

  // Create and assign token
  const token = jwt.sign({ _id: user._id }, process.env.SECRET);
  return res
    .status(200)
    .header('auth-token', token)
    .json
    (
      {
        token: token,
        redirect: 'batcave'
      }
    );

});

/* ============================================================================
 * Exports
 * ========================================================================= */
module.exports = route;