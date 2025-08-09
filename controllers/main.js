import * as AuthController from './authController.js';


document.addEventListener('DOMContentLoaded', () => {
  AuthController.initAuthViewFnc(); // Password toggle

  AuthController.initAuthToggle(); //  Login/signup toggle

  AuthController.handleLoginValidation(); // Init Login validation

  AuthController.handleSignupValidation(); // Init signin validation

  AuthController.initAuthObserver()

  AuthController.handleLogout();

});





