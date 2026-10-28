import { Application } from "./Application";
import type { ApplicationType } from "../../Types/ApplicationType";
import { EyeOff } from "lucide-react";
import type { StatusProps } from "../../Types/StatusesType";

type ApplicationColProps = StatusProps & {
  applications: ApplicationType[];
  status: string;
};

export function ApplicationCol({
  applications,
  status,
  statuses,
  setStatuses,
}: ApplicationColProps) {
  const key = status as keyof typeof statuses;

  if (statuses[key]) {
    return (
      <div className="w-81 flex justify- flex-col align-center rounded-md shadow-md bg-slate-200">
        <div className="relative flex justify-center items-center">
          <span className="text-center py-2 text-xl font-light">{status}</span>
          <EyeOff
            onClick={() => {
              setStatuses((prev) => ({ ...prev, [key]: false }));
            }}
            className="absolute right-2 cursor-pointer"
          />
        </div>
        <ul className="flex flex-col gap-2 py-2 px-1">
          {applications
            .filter((a) => a.status === status)
            .map((a) => (
              <Application application={a} key={a.id} />
            ))}
        </ul>
      </div>
    );
  }
}
