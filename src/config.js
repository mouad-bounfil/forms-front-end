/** Backend API origin (CRA injects REACT_APP_* at build/start time from .env files). */
export const API_BASE_URL =
  process.env.REACT_APP_BACKEND_URL ?? "http://localhost:4000";
