// jest.setup.js
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'text-encoding';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

global.importMetaEnv = {
  VITE_API_KEY: 'mock-api-key', // Add any other environment variables you need
  VITE_BASE_URL: 'mock-base-url',
};

// jest.setup.js
process.env.VITE_API_KEY = 'mock-api-key'; // Define your mock API key