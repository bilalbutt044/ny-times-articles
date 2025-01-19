// src/utils/env.js
export function getEnvVariable(key) {
  // Use global.importMetaEnv for Jest (mocked import.meta.env)
  if (typeof global !== 'undefined' && global.importMetaEnv) {
    return global.importMetaEnv[key];
  }
  // Use import.meta.env for Vite (only in browser environment)
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[key];
  }
  // Fallback (e.g., for static environments)
  return undefined;
}