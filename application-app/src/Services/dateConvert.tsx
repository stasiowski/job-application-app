import type { ApplicationType } from "../Types/ApplicationType";

//Used to convert the objects date to the Date object
export function dateConvert(data: ApplicationType[]) {
  return data.map((application: ApplicationType) => ({
    ...application,
    date: new Date(application.date),
  }));
}
