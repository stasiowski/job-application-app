import type { ApplicationType } from "../Types/ApplicationType";

type ApplicationProps = {
  application: ApplicationType;
};

export function Application({ application }: ApplicationProps) {
  return (
    <li className="w-78 flex items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm transition hover:shadow-md hover:border-gray-300 cursor-pointer">
      <div className="flex flex-col">
        <span title={application.title} className="text-gray-900 truncate w-44">
          {application.title}
        </span>
        <span className="text-sm">{application.location}</span>
      </div>
      <time
        dateTime={application.date.toISOString()}
        className="shrink-0 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
      >
        {application.date.toLocaleDateString()}
      </time>
    </li>
  );
}
