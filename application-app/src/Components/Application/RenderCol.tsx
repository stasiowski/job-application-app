import { ApplicationCol } from "./ApplicationCol";
import type { ApplicationType } from "../../Types/ApplicationType";
import type { StatusProps } from "../../Types/StatusesType";

type ApplicationHomeProps = StatusProps & {
  applications: ApplicationType[];
};

export function RenderCol({
  applications,
  statuses,
  setStatuses,
}: ApplicationHomeProps) {
  return (
    <div className="flex flex-1 justify-start gap-3">
      {Object.keys(statuses).map((status: string) => (
        <ApplicationCol
          key={status}
          applications={applications}
          status={status}
          statuses={statuses}
          setStatuses={setStatuses}
        />
      ))}
    </div>
  );
}
