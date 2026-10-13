import { Application } from "./Application";
import type { ApplicationType } from "../../Types/ApplicationType";
import { EyeOff } from "lucide-react";

type ApplicationColProps = {
  applications: ApplicationType[];
  status: string;
};

export function ApplicationCol({ applications, status }: ApplicationColProps) {
  return (
    <div className="w-80 flex justify- flex-col align-center rounded-md shadow-md bg-slate-200">
      <div className="relative flex justify-center items-center">
        <span className="text-center py-2 text-xl font-light">{status}</span>
        <EyeOff className="absolute right-2 cursor-pointer" />
      </div>
      <ul className="flex flex-col gap-2 py-2 px-1">
        {applications
          .filter((a) => a.status === status)
          .map((a) => (
            <Application application={a} />
          ))}
      </ul>
    </div>
  );
}
