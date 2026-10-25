import { ApplicationForm } from "./ApplicationForm";
import type { ApplicationType } from "../../Types/ApplicationType";
import { useState } from "react";
import { ApplicationCol } from "./ApplicationCol";
import { AccountMenu } from "../Account/AccountMenu";

type ApplicationHomeProps = {
  applications: ApplicationType[];
};

export function HomePage({ applications }: ApplicationHomeProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  return (
    <div className="p-6 relative min-h-screen font-Inter flex flex-col gap-3 bg-slate-100 text-slate-900">
      <div className="flex items-center justify-between text-2xl font-light">
        <span>Job Tracker</span>
        <AccountMenu isLoggedIn={isLoggedIn} />
      </div>
      <div className="flex flex-1 justify-start gap-3">
        <ApplicationCol applications={applications} status="Saved" />
        <ApplicationCol applications={applications} status="Applied" />
        <ApplicationCol applications={applications} status="Interview" />
        <ApplicationCol applications={applications} status="Offered" />
        <ApplicationCol applications={applications} status="Rejected" />
      </div>
    </div>
  );
}
