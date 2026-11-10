import axios from "axios";
import type { newApplicationType } from "../Types/ApplicationType";

// The JWT is stored in memory and attached to protected API requests.
let token: string | null = null;

const api = axios.create({
  baseURL: "/api",
});

// Automatically log the user out if the server rejects a request as unauthorized.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

// Store the JWT in memory so every authenticated request can reuse it.
export function setToken(newToken: string | null) {
  token = `Bearer ${newToken}`;
}

// Fetch the current user's application board from the backend.
export async function getAll() {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get("/api/applications", config);
  return response.data;
}

// Create a new job application record for the authenticated user.
export async function create(application: newApplicationType) {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post("/api/applications", application, config);
  return response.data;
}

// Remove a specific application by id.
export async function remove(applicationid: string) {
  const response = await axios.delete(`/api/applications/${applicationid}`);
  return response.data;
}

// Authenticate a user and get a JWT back from the server.
export async function login(credentials: {
  password: string;
  username: string;
}) {
  const response = await axios.post("/api/login", credentials);
  return response.data;
}

// Register a new user account.
export async function register(credentials: {
  username: string;
  password: string;
}) {
  const response = await axios.post("/api/users", credentials);
  return response.data;
}
