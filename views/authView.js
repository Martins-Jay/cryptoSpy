// authView.js file : All DOM selection & UI logic (toggle visibility, show/hide password, get form data).


//  DOM Selectors
export const toggleSignupBtn = document.getElementById('toggle-signup');
export const toggleLoginBtn = document.getElementById('toggle-login');
export const textCenter = document.getElementById('dynamic-text-center');
export const signupForm = document.getElementById('signup-form'); // selects signup form container
export const loginForm = document.getElementById('login-form'); // selects signup form container

// Login Input Fields
export const loginEmail_Input = document.getElementById('login-email');
export const loginPassword_Input = document.getElementById('password-input');
// Login Error Container
export const loginEmail_ErrorContainer = document.getElementById(
  'login-email-error-container'
);
export const loginPassword_ErrorContainer = document.getElementById(
  'login-password-error-container'
);
// Login error Message
export const loginEmail_ErrorText =
  document.getElementById('login-email-error');
export const loginPassword_ErrorText =
  document.getElementById('login-pw-error');

// Signup Input Fields
export const signupName_input = document.getElementById('signup-name');
export const signupEmail_input = document.getElementById('signup-email');
export const signupPassword_input = document.getElementById('signup-password');
export const signupConfirm_input = document.getElementById('confirm-password');
// Signup Error Container
export const signupName_ErrorContainer = document.getElementById(
  'signup-name-error-container'
);
export const signupEmail_ErrorContainer = document.getElementById(
  'signup-email-error-container'
);
export const signupPassword_ErrorContainer = document.getElementById(
  'signup-password-error-container'
);
export const signupConfirm_ErrorContainer = document.getElementById(
  'signup-confirm-error-container'
);
// Signup error Message
export const signupName_ErrorText =
  document.getElementById('signup-name-error');
export const signupEmail_ErrorText =
  document.getElementById('signup-email-error');
export const signupPassword_ErrorText = document.getElementById(
  'signup-password-error'
);
export const signupConfirmPassword_ErrorText = document.getElementById(
  'signup-confirm-password-error'
);

// Select auth section elements
export const authContainer = document.getElementById("auth-section");
export const dashboardContainer = document.getElementById("dashboard-section");
export const logoutBtn = document.getElementById("logout-btn");

export function clearAuthForms() {
  const forms = authContainer.querySelectorAll('form')
  console.log(forms);

  forms.forEach(formEl => {formEl.reset()})
}

export function showDashboard() {
  authContainer.classList.add('hidden');
  dashboardContainer.classList.remove('hidden')
}

export function showAuthPage() {
  dashboardContainer.classList.add("hidden");
  authContainer.classList.remove("hidden");

  signupForm.classList.add('hidden')
  loginForm.classList.remove('hidden')
}

export function updateUserDisplay(user) {
  const userDisplay = document.querySelector('#user-display')
  userDisplay.textContent = user.displayName || '';
}



// Get user login input values
export function getLoginCredentials() {
  return {
    email: loginEmail_Input.value.trim(),
    password: loginPassword_Input.value.trim()
  }
}

// Get user signup input values
export function getSignupCredentials() {
  return {
    name: signupName_input.value.trim(),
    email: signupEmail_input.value.trim(),
    password: signupPassword_input.value.trim(),
    confirmPassword: signupConfirm_input.value.trim(),
  }
}

//  SVG icons (kept inside this module)
const eyeOpenIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
       viewBox="0 0 24 24" stroke="#6B7280">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943
           9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
`;

const eyeClosedIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
       viewBox="0 0 24 24" stroke="#6B7280">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7
           a9.96 9.96 0 012.293-3.95m2.241-2.241A9.956 9.956 0 0112 5c4.477 0
           8.268 2.943 9.542 7a9.956 9.956 0 01-4.109 5.198M15 12a3 3 0 11-6 0
           3 3 0 016 0z" />
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M3 3l18 18" />
  </svg>
`;

export const exclamationCircle = `<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="#F44336 "
  class="size-4"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
  />
</svg>`;

//  Password visibility toggle
export function initPasswordToggle() {
  const eyeSVG_Elements = document.querySelectorAll('.toggle-password-btn');

  eyeSVG_Elements.forEach((eyeSVG_Element) => {

    //  Set initial icon
    eyeSVG_Element.innerHTML = eyeClosedIcon;

    eyeSVG_Element.addEventListener('click', () => {
      // Find the related input within the same parent container
      const inputEl = eyeSVG_Element
        .closest('div')
        .querySelector('.password-input');

      inputEl.type = inputEl.type === 'password' ? 'text' : 'password';
      eyeSVG_Element.innerHTML =
        inputEl.type === 'text' ? eyeOpenIcon : eyeClosedIcon;
    });
  });
}

// Ternary Guide:
// If the passwordInput.type is === 'password',
// Then change it to 'text', otherwise change it back to 'password'."

// Show error icon and message
// export function showError(inputEL, errorEl, message) {}
