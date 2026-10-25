import type { ApplicationType } from "../Types/ApplicationType";

export function dateConvert(data: ApplicationType[]) {
  return data.map((application: ApplicationType) => ({
    ...application,
    date: new Date(application.date),
  }));
}
