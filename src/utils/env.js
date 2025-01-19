// src/utils/env.js
export function getEnvVariable(key) {
  // Use process.env for Jest/Node.js
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key];
  }
  // Use import.meta.env for Vite
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[key];
  }
  // Fallback (e.g., for static environments)
  return undefined;
}