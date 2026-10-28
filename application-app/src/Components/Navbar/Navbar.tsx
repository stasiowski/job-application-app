import { RightNavbar } from "./RightNavbar";
import type { StatusProps } from "../../Types/StatusesType";

export function Navbar({ statuses, setStatuses }: StatusProps) {
  return (
    <div className="flex items-center justify-between text-2xl font-light">
      <span>Job Tracker</span>
      <RightNavbar statuses={statuses} setStatuses={setStatuses} />
    </div>
  );
}
