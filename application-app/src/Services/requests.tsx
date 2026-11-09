import axios from "axios";
import type { newApplicationType } from "../Types/ApplicationType";

let token: string | null = null;

const api = axios.create({
  baseURL: "/api",
});

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

export function setToken(newToken: string | null) {
  token = `Bearer ${newToken}`;
}

export async function getAll() {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get("/api/applications", config);
  return response.data;
}

export async function create(application: newApplicationType) {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post("/api/applications", application, config);
  return response.data;
}

export async function remove(applicationid: string) {
  const response = await axios.delete(`/api/applications/${applicationid}`);
  return response.data;
}

export async function login(credentials: {
  password: string;
  username: string;
}) {
  const response = await axios.post("/api/login", credentials);
  return response.data;
}

export async function register(credentials: {
  username: string;
  password: string;
}) {
  const response = await axios.post("/api/users", credentials);
  return response.data;
}
