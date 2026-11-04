import axios from "axios";
import type { ApplicationType } from "../Types/ApplicationType";

let token: string | null = null;

export function setToken(newToken: string | null) {
  token = `Bearer ${newToken}`;
}

export async function getAll() {
  const response = await axios.get("/api/applications");

  return response.data;
}

export async function create(application: ApplicationType) {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post("/api/applications", application, config);
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
