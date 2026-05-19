/**
 * Utilitaires génériques (throttle, debounce)
 * Utilisation : import { throttle, debounce } from '../utils/helpers.js';
 */

/**
 * Limite le nombre d'appels d'une fonction sur une période donnée.
 * @param {Function} func - La fonction à exécuter.
 * @param {number} delay - Délai en millisecondes.
 * @returns {Function}
 */
export function throttle(func, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    }
  };
}

/**
 * Reporte l'exécution d'une fonction jusqu'à la fin d'une série d'appels rapprochés.
 * @param {Function} func - La fonction à exécuter.
 * @param {number} delay - Délai en millisecondes.
 * @returns {Function}
 */
export function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}