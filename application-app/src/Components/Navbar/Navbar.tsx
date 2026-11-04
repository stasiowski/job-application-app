import { RightNavbar } from "./RightNavbar";
import type { StatusProps } from "../../Types/StatusesType";
import type { UserType } from "../../Types/UserType";
import type { ApplicationType } from "../../Types/ApplicationType";

type NavbarProps = StatusProps & {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  setApplications: React.Dispatch<React.SetStateAction<ApplicationType[]>>;
};

export function Navbar({
  statuses,
  setStatuses,
  user,
  setUser,
  setApplications,
}: NavbarProps) {
  return (
    <div className="flex w-full items-center justify-between text-2xl font-light">
      <span>Job Tracker</span>

      <RightNavbar
        statuses={statuses}
        setStatuses={setStatuses}
        user={user}
        setUser={setUser}
        setApplications={setApplications}
      />
    </div>
  );
}
