import * as AuthController from './authController.js';

document.addEventListener('DOMContentLoaded', () => {
  AuthController.initAuthViewFnc(); // Password toggle

  AuthController.initAuthToggle(); //  Login/signup toggle

  AuthController.handleLoginValidation(); // Init validation
});
