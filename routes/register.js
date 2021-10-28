/* ============================================================================
 * Authenticate user
 * ========================================================================= */
const route = require('express').Router();

const SECRET = process.env.SECRET;
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;

/* ============================================================================
 * Misc. module imports
 * ========================================================================= */
const User = require('../model/User');
const validate = require('../validate').register;
const bcrypt = require('bcryptjs'); // Password hashing
const jwt = require('jsonwebtoken');


/* ============================================================================
 * Endpoints
 * ========================================================================= */
route.post('/', async (req, res) => {

  // Validate indata
  const error = validate(req.body).error;
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

  // Check if user exists (duplicate email)
  const exists = await User.findOne
    (
      {
        email: req.body.email
      }
    ) ? true : false;

  if (exists) {
    return res
      .status(400)
      .json
      (
        {
          error: 'Email exists'
        }
      );
  }

  // Create new User object
  const user = new User
    (
      {
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash
          (
            req.body.password,
            await bcrypt.genSalt(SALT_ROUNDS)
          )
      }
    );

  // Tro to save user in db, or bail out
  try {

    await user.save();

    return res
      .status(200)
      .json(
        {
          user: user._id,
          redirect: 'batcave',
          token: jwt.sign
            (
              {
                _id: user._id
              },
              SECRET
            )
        }
      );

  } catch (e) {

    return res
      .status(400)
      .json(e);

  }

});

/* ============================================================================
 * Exports
 * ========================================================================= */
module.exports = route;


