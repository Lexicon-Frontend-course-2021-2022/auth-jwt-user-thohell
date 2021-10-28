/* ============================================================================
 * Config
 * ========================================================================= */
require('dotenv').config();

const PORT = process.env.PORT || 9090;
const DB_URI = process.env.DB_URI;

/* ============================================================================
 * App
 * ========================================================================= */
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

/* ============================================================================
 * db
 * ========================================================================= */
const mongoose = require('mongoose');

/* ============================================================================
 * Routes
 * ========================================================================= */
app.use('/api/user/register', require('./routes/register'));
app.use('/api/user/login', require('./routes/login'));
app.use('/api/secure', require('./routes/secure'));
app.use('/', require('./routes/pages'));

/* ============================================================================
 * Start express server
 * ========================================================================= */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/* ============================================================================
 * connect to DB
 * ========================================================================= */
mongoose.connect(DB_URI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
  () => {
    console.log(`Connected to db '${DB_URI}'`);
  });

