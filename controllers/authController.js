// authController.js

import * as authView from '../views/authView.js';
import * as LoaderView from '../views/loaderView.js';
import { TIMEOUT_SEC } from '../config/config.js';
import {
  validateConfirmPassword,
  validateFieldFnc,
} from '../helpers/formValidator.js';

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

// Checks if string contains @ and .com
function isValidEmailFn(inputValue) {
  return inputValue.includes('@') && inputValue.includes('.com');
}

// Checks if password is at least 5 characters
function isValidPasswordFn(inputValue) {
  return inputValue.length >= 5;
}

// Checks if name has only letters and at least 3 characters
function isValidNameFn(inputValue) {
  return /^[a-zA-Z]{3,}$/.test(inputValue); // letters only, 3+ characters
}

function isPasswordMatchFn(confirmVal, originalVal) {
  return confirmVal === originalVal;
}

// LOGIN form logic
export function handleLoginValidation() {


  authView.loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailValid = validateFieldFnc(
      authView.loginEmail_Input,
      isValidEmailFn,
      authView.loginEmail_ErrorContainer,
      authView.loginEmail_ErrorText,
      'Email must contain @mail.com'
    );

    const passwordValid = validateFieldFnc(
      authView.loginPassword_Input,
      isValidPasswordFn,
      authView.loginPassword_ErrorContainer,
      authView.loginPassword_ErrorText,
      'Password must be at least 5 characters'
    );

    if (emailValid && passwordValid) {
      console.log('✅ Logging in...');
      LoaderView.showLoader(TIMEOUT_SEC); // Shows spinner

      setTimeout(() => {
        LoaderView.hideLoader(); // Hides loader after timerdelay
      }, 5000);
    }
  });
}

// SIGNUP form logic
export function handleSigninValidation() {

  authView.signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameValid = validateFieldFnc(
      authView.signupName_input,
      isValidNameFn,
      authView.signupName_ErrorContainer,
      authView.signupName_ErrorText,
      'Name must be at least 3 letters and contain only letters'
    );

    const emailValid = validateFieldFnc(
      authView.signupEmail_input,
      isValidEmailFn,
      authView.signupEmail_ErrorContainer,
      authView.signupEmail_ErrorText,
      'Email must contain @mail.com'
    );

    const passwordValid = validateFieldFnc(
      authView.signupPassword_input,
      isValidPasswordFn,
      authView.signupPassword_ErrorContainer,
      authView.signupPassword_ErrorText,
      'Password must be at least 5 characters'
    );

    const confirmPwValid = validateConfirmPassword(
      authView.signupPassword_input,
      authView.signupConfirm_input,
      authView.signupConfirm_ErrorContainer,
      authView.signupConfirmPassword_ErrorText
    );

    if (emailValid && passwordValid && nameValid && confirmPwValid) {
      console.log('✅ Logging in...');
      LoaderView.showLoader(TIMEOUT_SEC); // Shows spinner

      setTimeout(() => {
        LoaderView.hideLoader(); // Hides loader after timerdelay
      }, 5000);
    }
  });
}




// // Login Form Validation idea
// export function handleLoginValidation() {
//   authView.loginForm.addEventListener('submit', (e) => {
//     e.preventDefault();

//     let isValid = true;

//     const email = authView.signupEmail_Input.value;

//     // Email check
//     if (email.trim() === '') {
//       authView.signupEmail_ErrorContainer.classList.remove('hidden');
//       authView.signupEmail_ErrorText.innerHTML = 'Field cannot be left empty';
//       isValid = false;
//     } else if (!email.includes('@')) {
//       authView.signupEmail_ErrorContainer.classList.remove('hidden');
//       authView.signupEmail_ErrorText.innerHTML = 'Email must contain @';
//       isValid = false;
//     } else if (!email.includes('.com')) {
//       authView.signupEmail_ErrorContainer.classList.remove('hidden');
//       authView.signupEmail_ErrorText.innerHTML = 'Email must contain .com';
//       isValid = false;
//     } else {
//       authView.signupEmail_ErrorContainer.classList.add('hidden');
//     }

//     // Password check
//     if (authView.loginPassword_Input.value.trim() === '') {
//       authView.loginPassword_ErrorContainer.classList.remove('hidden');
//       authView.loginPassword_ErrorText.innerHTML = 'Field cannot be left empty';
//       isValid = false;
//     } else if (authView.loginPassword_Input.value.trim().length < 5) {
//       authView.loginPassword_ErrorContainer.classList.remove('hidden');
//       authView.loginPassword_ErrorText.innerHTML =
//         'Password must be at least 5 characters';
//       isValid = false;
//     } else {
//       authView.loginPassword_ErrorContainer.classList.add('hidden');
//     }

//     // Final submit action if valid
//     if (isValid) {
//       console.log('✅ Logging in...');
//       LoaderView.showLoader(TIMEOUT_SEC); // Shows spinner

//       setTimeout(() => {
//         LoaderView.hideLoader(); // Hides loader after timerdelay
//       }, 5000);
//     }
//   });
// }

// // Signup form validation
// export function handleSigninValidation() {
//   authView.signupForm.addEventListener('submit', (e) => {
//     e.preventDefault();

//     let isValid = true;
//     const name = authView.signupName_input.value.trim();
//     const email = authView.signupEmail_input.value.trim();

//     // Name check
//     if (name === '') {
//       authView.signupName_ErrorContainer.classList.remove('hidden');
//       authView.signupName_ErrorText.innerHTML = 'First name is required';
//       isValid = false;
//     } else if (name.length < 3) {
//       authView.signupName_ErrorContainer.classList.remove('hidden');
//       authView.signupName_ErrorText.innerHTML =
//         'First name must above 2 letters';
//       isValid = false;
//     } else if (!/^[a-zA-Z]+$/.test(name)) {
//       // This line ensures only letters a-z or A-Z are allowed
//       authView.signupName_ErrorContainer.classList.remove('hidden');
//       authView.signupName_ErrorText.innerHTML =
//         'First name must contain only letters';
//       isValid = false;
//     } else {
//       authView.signupName_ErrorContainer.classList.add('hidden');
//     }

//     // Email check
//     if (email.trim() === '') {
//       authView.signupEmail_ErrorContainer.classList.remove('hidden');
//       authView.signupEmail_ErrorText.innerHTML = 'Field cannot be left empty';
//       isValid = false;
//     } else if (!email.includes('@')) {
//       authView.signupEmail_ErrorContainer.classList.remove('hidden');
//       authView.signupEmail_ErrorText.innerHTML = 'Email must contain @';
//       isValid = false;
//     } else if (!email.includes('.com')) {
//       authView.signupEmail_ErrorContainer.classList.remove('hidden');
//       authView.signupEmail_ErrorText.innerHTML = 'Email must contain .com';
//       isValid = false;
//     } else {
//       authView.signupEmail_ErrorContainer.classList.add('hidden');
//     }
//   });
// }
