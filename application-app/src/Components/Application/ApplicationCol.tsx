import { Application } from "./Application";
import type { ApplicationType } from "../../Types/ApplicationType";
import { EyeOff } from "lucide-react";
import type { StatusProps } from "../../Types/StatusesType";
import { remove } from "../../Services/requests";

type ApplicationColProps = StatusProps & {
  applications: ApplicationType[];
  setApplications: React.Dispatch<React.SetStateAction<ApplicationType[]>>;
  status: string;
};

// Returns the rendering of each column
// Each column is based on the statuses of job application stages

export function ApplicationCol({
  applications,
  status,
  statuses,
  setStatuses,
  setApplications,
}: ApplicationColProps) {
  const key = status as keyof typeof statuses;

  //Handles removing from db + from State
  async function handleRemove(applicationId: string) {
    await remove(applicationId);
    setApplications((prev) =>
      prev.filter(
        (application: ApplicationType) => application.id !== applicationId,
      ),
    );
  }

  if (statuses[key]) {
    return (
      // Outer
      <div className="w-81 flex justify- flex-col align-center rounded-md shadow-md bg-slate-200">
        {/* Top row of columns */}
        <div className="relative flex justify-center items-center">
          <span className="text-center py-2 text-xl font-light">{status}</span>
          <EyeOff
            onClick={() => {
              setStatuses((prev) => ({ ...prev, [key]: false }));
            }}
            className="absolute right-2 cursor-pointer"
          />
        </div>
        {/* List of Applications mapped */}
        <ul className="flex flex-col gap-2 py-2 px-1">
          {applications
            .filter((a) => a.status === status)
            .map((a) => (
              <Application
                application={a}
                key={a.id}
                setApplications={setApplications}
                handleRemove={handleRemove}
              />
            ))}
        </ul>
      </div>
    );
  }
}
