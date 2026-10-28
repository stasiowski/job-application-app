import type { ApplicationType } from "../../Types/ApplicationType";
import { Navbar } from "../Navbar/Navbar";
import { RenderCol } from "./RenderCol";
import { useState } from "react";
import type { StatusesType } from "../../Types/StatusesType";

type ApplicationHomeProps = {
  applications: ApplicationType[];
};

export function HomePage({ applications }: ApplicationHomeProps) {
  const [statuses, setStatuses] = useState<StatusesType>({
    Saved: true,
    Applied: true,
    Interview: true,
    Offered: true,
    Rejected: true,
  });

  return (
    <div className="p-6 relative min-h-screen font-Inter flex flex-col gap-4 bg-slate-100 text-slate-900">
      <Navbar statuses={statuses} setStatuses={setStatuses} />
      <hr className="w-screen relative left-1/2 -translate-x-1/2 border-t border-slate-300" />
      <RenderCol
        applications={applications}
        statuses={statuses}
        setStatuses={setStatuses}
      />
    </div>
  );
}
