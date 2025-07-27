// inputValue e.g. emailEntered, nameEntered
// errorContainer holds the hidden class

export function validateFieldFnc(
  inputEl,
  isValidRuleFn,
  errorContainer,
  errorText,
  message
) {
  //  Get user input without space
  const inputValue = inputEl.value.trim();

  // check if input is empty
  if (inputValue === '') {
    errorContainer.classList.remove('hidden');
    errorText.textContent = 'Field cannot be left empty';
    return false;
  }

  // check custom rule (e.g. length, letters only, etc).
  if (!isValidRuleFn(inputValue)) {
    errorContainer.classList.remove('hidden');
    errorText.textContent = message;
    return false;
  }

  // If all is good, hide the error
  errorContainer.classList.add('hidden');
  return true;
}

//  Confirm password match
export function validateConfirmPassword(
  passwordInput,
  confirmInput,
  errorContainer,
  errorText
) {
  const passwordValue = passwordInput.value.trim();
  const confirmPwValue = confirmInput.value.trim();

  if (confirmPwValue === '') {
    errorContainer.classList.remove('hidden');
    errorText.textContent = 'Please confirm your password';
    return false;
  }

  if (passwordValue !== confirmPwValue) {
    errorContainer.classList.remove('hidden');
    errorText.textContent = 'Passwords do not match';
    return false;
  }

  errorContainer.classList.add('hidden');
  return true;
}
