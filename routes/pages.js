/* ============================================================================
 * Serve static pages
 * ========================================================================= */
const route = require('express').Router();

/* ============================================================================
 * Endpoints
 * ========================================================================= */
route.get('/batcave', (req, res) => {
  res.sendFile(require('path').resolve('public/batcave.html'));
});

/* ============================================================================
 * Exports
 * ========================================================================= */
module.exports = route;