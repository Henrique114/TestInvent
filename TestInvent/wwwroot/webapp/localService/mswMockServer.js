import { setupWorker } from './msw.js';
import { handlers } from './mswHandlers.js';
export const worker = setupWorker(...handlers);
// Inicie o worker antes de qualquer chamada fetch
worker.start();