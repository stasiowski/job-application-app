import { useState, useEffect, useRef } from "react";
import type { ApplicationType } from "../../Types/ApplicationType";
import { Ellipsis } from "lucide-react";

type ApplicationProps = {
  application: ApplicationType;
  setApplications: React.Dispatch<React.SetStateAction<ApplicationType[]>>;
  handleRemove: (applicationId: string) => void;
};

// html for each panel
export function Application({ application, handleRemove }: ApplicationProps) {
  const [dropdown, setDropdown] = useState(false);
  const elipsisRef = useRef<HTMLDivElement>(null);

  //Handles render whenever outside click
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      //if the div for the elipsis exists and an outside press occurs close dropdown
      if (
        elipsisRef.current &&
        !elipsisRef.current.contains(event.target as Node)
      ) {
        setDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  //Renders the dropdown for each elipsis on an application
  function ElipsisDropdown() {
    return (
      <div className="absolute flex right-0 top-full z-50 bg-white text-sm shadow-md rounded-lg">
        <button
          onClick={() => {
            handleRemove(application.id);
          }}
          className="w-24 cursor-pointer py-2 flex justify-center rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
        >
          Delete
        </button>
      </div>
    );
  }
  return (
    <li className="w-78 flex relative items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm transition hover:shadow-md hover:border-gray-300">
      <div className="flex flex-col min-w-0 flex-1">
        <span className="opacity-65 text-[13px]">{application.company}</span>

        <span title={application.title} className="text-gray-900 truncate">
          {application.title}
        </span>

        <span className="text-sm">{application.location}</span>
      </div>

      <div className="flex flex-col items-end gap-2 shrink-0">
        <div
          ref={elipsisRef}
          className="rounded-full p-1 hover:bg-gray-100 cursor-pointer relative"
          onClick={() => {
            setDropdown((prev) => !prev);
          }}
        >
          <Ellipsis size={22} color="#000000" strokeWidth={1.5} />
          {dropdown && <ElipsisDropdown />}
        </div>
        <time
          dateTime={application.date.toISOString()}
          className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
        >
          {application.date.toLocaleDateString()}
        </time>
      </div>
    </li>
  );
}
