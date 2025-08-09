import { TIMEOUT_SEC } from "../config/config.js";

const loaderEl = document.getElementById('loader');
let raceTimeout;

export function showLoader(timeout) {
  loaderEl.classList.remove('hidden');
}

export function hideLoader() {
  loaderEl.classList.add('hidden');
  clearTimeout(raceTimeout);
}
