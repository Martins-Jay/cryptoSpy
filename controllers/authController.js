// authController.js

import * as authView from '../views/authView.js';
import * as authModel from '../models/authModel.js';
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

async function handleLoginSubmit(e) {
  e.preventDefault();

  const { email, password } = authView.getLoginCredentials();

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
    try {
      LoaderView.showLoader(TIMEOUT_SEC); // Shows spinner
      authView.clearAuthForms();

      const user = await authModel.loginUser(email, password);
      console.log(user);
      // Optional: Redirect to dashboard or show welcome message
    } catch (error) {
      //  Extract text between parenthesis
      const errorCode = error.code
        ? error.code.replace('auth/', '').replace(/-/g, ' ')
        : error.message;

      authView.loginEmail_ErrorContainer.classList.remove('hidden');
      authView.loginEmail_ErrorText.textContent = errorCode;
      authView.loginPassword_ErrorText.textContent = errorCode;
    } finally {
      LoaderView.hideLoader(); // Hides loader
    }
  }
}

export function handleLoginValidation() {
  authView.loginForm.addEventListener('submit', handleLoginSubmit);
}

// SIGNUP form logic
async function handleSignupSubmit(e) {
  e.preventDefault();

  const { name, email, password, confirmPassword } =
    authView.getSignupCredentials();

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

  // 4️⃣ If all fields are valid, try signup
  if (emailValid && passwordValid && nameValid && confirmPwValid) {
    try {
      LoaderView.showLoader(TIMEOUT_SEC); // Shows spinner
      authView.clearAuthForms();

      // Call the model to create the user
      const user = await authModel.signupUser(name, email, password);
      console.log('✅ Signup successful:', user);

      // Optional: Redirect to dashboard or show welcome message
    } catch (error) {
      //  Extract text between parenthesis
      const errorCode = error.code
        ? error.code.replace('auth/', '').replace(/-/g, ' ')
        : error.message;

      authView.signupEmail_ErrorContainer.classList.remove('hidden');
      authView.signupEmail_ErrorText.textContent = errorCode;
    } finally {
      LoaderView.hideLoader(); // Hides loader
    }
  }
}

export function handleSignupValidation() {
  authView.signupForm.addEventListener('submit', handleSignupSubmit);
}

export function initAuthObserver() {
  authModel.observeAuthState((user) => {
    if (user) {
      // User is logged in
      authView.updateUserDisplay(user)
      authView.showDashboard();
    } else {
      // No user is logged in
      console.log('User logged out');
      authView.showAuthPage();
    }
  });
}

export function handleLogout() {
  authView.logoutBtn.addEventListener('click', async () => {
    await authModel.logoutUser();
    console.log('User logged out successfully');
  });
}
