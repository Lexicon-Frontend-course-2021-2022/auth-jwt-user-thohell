/* ============================================================================
 * Elements
 * ========================================================================= */

// Sign up inputs
const signUpForm = document.querySelector('#sign-up-form');
const signUpName = document.querySelector('#sign-up-name');
const signUpEmail = document.querySelector('#sign-up-email');
const signUpPassword = document.querySelector('#sign-up-password');

// Login inputs
const loginForm = document.querySelector('#login-form');
const loginEmail = document.querySelector('#email');
const loginPassword = document.querySelector('#password');

// error messages
const errorMsg = document.querySelector('#error');

/* ============================================================================
 * Signup form
 * ========================================================================= */
signUpForm.addEventListener('submit', e => {

  e.preventDefault();

  // Call API
  fetch('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify
      (
        {
          name: signUpName.value,
          email: signUpEmail.value,
          password: signUpPassword.value
        }
      )
  })

    // Convert from json => object
    .then(res => res.json())

    // Handle response
    .then(response => {

      if (response.error) {

        setErrorMessage(response.error);

      } else {

        // Stash token
        localStorage.setItem('auth-token', response.token);

        clearErrorMessage();
        location.href = response.redirect;

      }
    });
});

/* ============================================================================
 * Login form
 * ========================================================================= */
loginForm.addEventListener('submit', e => {
  e.preventDefault();

  // Call API
  fetch('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify
      (
        {
          email: loginEmail.value,
          password: loginPassword.value
        }
      )
  })

    // Convert from json => object
    .then(res => res.json())

    // Handle response
    .then(response => {
      if (response.error) {

        setErrorMessage(response.error);

      } else {

        // Stash token
        localStorage.setItem('auth-token', response.token);

        clearErrorMessage();
        location.href = response.redirect;

      }
    });
});

/* ============================================================================
 * Helper functions
 * ========================================================================= */
const setErrorMessage = msg => errorMsg.innerHTML = msg ? msg : '';
const clearErrorMessage = () => setErrorMessage();