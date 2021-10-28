/* ============================================================================
 * Input validation
 * ========================================================================= */
const Joi = require('@hapi/joi');

/* ============================================================================
 * Define rules for the fields we want to validate
 * ========================================================================= */
const fields = {

  name: Joi
    .string()
    .min(6)
    .max(255)
    .required(),

  email: Joi
    .string()
    .min(6)
    .max(255)
    .required()
    .email(),

  password: Joi
    .string()
    .min(6)
    .max(1024)
    .required()

}

/* ============================================================================
 * Exports
 * ========================================================================= */
module.exports = {

  /* --------------------------------------------------------------------------
   * Validation rule for 'register'
   * ----------------------------------------------------------------------- */
  register: (data) => {

    // Pick fields to validate
    const { name, email, password } = fields;

    return Joi.object
      (
        {
          name,
          email,
          password
        }
      ).validate(data);
  },

  /* --------------------------------------------------------------------------
   * Validation rule for 'login'
   * ----------------------------------------------------------------------- */
  login: (data) => {

    // Pick fields to validate
    const { email, password } = fields;

    return Joi.object
      (
        {
          email,
          password
        }
      ).validate(data);
  }

};
