import { TIMEOUT_SEC } from "../config/config.js";

const loaderEl = document.getElementById('loader');
let raceTimeout;

export function showLoader(timeout) {
  clearTimeout(raceTimeout);
  loaderEl.classList.remove('hidden');

  // Optional: auto-hide after delay
  raceTimeout = setTimeout(() => {
    hideLoader(); // Called by jscript after delay 
  }, timeout * 1000);
}

export function hideLoader() {
  loaderEl.classList.add('hidden');
  clearTimeout(raceTimeout);
}
