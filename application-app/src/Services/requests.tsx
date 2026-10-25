import axios from "axios";
import type { ApplicationType } from "../Types/ApplicationType";

export async function getAll() {
  const response = await axios.get("/api/applications");

  return response.data;
}

export async function create(application: ApplicationType) {
  const response = await axios.post("/api/application", application);
  return response.data;
}
