import { ApplicationForm } from "./ApplicationForm";
import { Application } from "./Application";
import type { ApplicationType } from "../Types/ApplicationType";
import { useState } from "react";
import { ApplicationCol } from "./ApplicationCol";

export function HomePage() {
  const [applications, setApplications] = useState<ApplicationType[]>([
    {
      title: "Software Engineer",
      company: "Amazon",
      date: new Date(),
      status: "Saved",
      location: "London, UK",
    },
    {
      title: "Frontend Developer",
      company: "Google",
      date: new Date(),
      status: "Applied",
      location: "Manchester, UK",
    },
    {
      title: "Full Stack Developer",
      company: "Microsoft",
      date: new Date(),
      status: "Interview",
      location: "Remote",
    },
    {
      title: "Junior Software Engineer",
      company: "Meta",
      date: new Date(),
      status: "Offered",
      location: "London, UK",
    },
    {
      title: "React Developer",
      company: "Spotify",
      date: new Date(),
      status: "Rejected",
      location: "Remote",
    },
  ]);
  return (
    <div className="p-6 relative min-h-screen font-Inter flex gap-3 bg-slate-100 text-slate-900">
      <div className="flex flex-col align-center gap-3 mx-auto">
        <header className="text-2xl font-light">Job Tracker</header>
        <div className="flex flex-1 gap-3 ">
          <ApplicationCol applications={applications} status="Saved" />
          <ApplicationCol applications={applications} status="Applied" />
          <ApplicationCol applications={applications} status="Interviews" />
          <ApplicationCol applications={applications} status="Offered" />
          <ApplicationCol applications={applications} status="Rejected" />
        </div>
      </div>
    </div>
  );
}
