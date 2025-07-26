// authController.js

import * as authView from '../views/authView.js';
import * as LoaderView from '../views/loaderView.js';
import { TIMEOUT_SEC } from '../config/config.js';

let signupState = false; // signup form not being displayed - default displayed is login

// Called when toggle buttons are clicked: Used in initAuthToggle
function changeAuthView() {
  if (signupState) {
    authView.textCenter.innerHTML = 'Signup to Continue';
    authView.loginForm.classList.add('hidden');
    authView.signupForm.classList.remove('hidden');
  } else {
    authView.textCenter.innerHTML = 'Login to Get Started';
    authView.signupForm.classList.add('hidden');
    authView.loginForm.classList.remove('hidden');
  }
}

export const initAuthToggle = function () {
  // Show signup
  authView.toggleSignupBtn.addEventListener('click', () => {
    signupState = !signupState; // flip state - true now
    changeAuthView();
  });

  // Show Login
  authView.toggleLoginBtn.addEventListener('click', () => {
    signupState = false;
    changeAuthView();
  });
};

// Show/hide password
export function initAuthViewFnc() {
  authView.initPasswordToggle();
}

// Form Submit Handler
export function handleLoginSubmit(e) {
  e.preventDefault();
  //  Or this: depending on which timer have shorter time delay
  setTimeout(() => {
    LoaderView.hideLoader(); // Hides loader after timerdelay
  }, 4000);
}

// Login Form Validation
export function handleLoginValidation() {
  authView.loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Email check
    if (authView.loginEmail_Input.value.trim() === '') {
      authView.loginEmail_ErrorContainer.classList.remove('hidden');
      authView.loginEmail_ErrorText.innerHTML = 'Field cannot be left empty';
      isValid = false;
    } else if (!authView.loginEmail_Input.value.includes('@')) {
      authView.loginEmail_ErrorContainer.classList.remove('hidden');
      authView.loginEmail_ErrorText.innerHTML = 'Email must contain @';
      isValid = false;
    } else if (!authView.loginEmail_Input.value.includes('.com')) {
      authView.loginEmail_ErrorContainer.classList.remove('hidden');
      authView.loginEmail_ErrorText.innerHTML = 'Email must contain .com';
      isValid = false;
    } else {
      authView.loginEmail_ErrorContainer.classList.add('hidden');
    }

    // Password check
    if (authView.loginPassword_Input.value.trim() === '') {
      authView.loginPassword_ErrorContainer.classList.remove('hidden');
      authView.loginPassword_ErrorText.innerHTML = 'Field cannot be left empty';
      isValid = false;
    } else if (authView.loginPassword_Input.value.trim().length < 5) {
      authView.loginPassword_ErrorContainer.classList.remove('hidden');
      authView.loginPassword_ErrorText.innerHTML = 'Password must be at least 5 characters'
      isValid = false;
    } else {
      authView.loginPassword_ErrorContainer.classList.add('hidden');
    }

    // Final submit action if valid
    if (isValid) {
      console.log('✅ Logging in...');
      LoaderView.showLoader(TIMEOUT_SEC); // Shows spinner

      setTimeout(() => {
        LoaderView.hideLoader(); // Hides loader after timerdelay
      }, 5000);
    }
  });
}
