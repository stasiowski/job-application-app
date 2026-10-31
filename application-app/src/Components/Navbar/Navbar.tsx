import { RightNavbar } from "./RightNavbar";
import type { StatusProps } from "../../Types/StatusesType";
import type { UserType } from "../../Types/UserType";

type NavbarProps = StatusProps & {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};

export function Navbar({ statuses, setStatuses, user, setUser }: NavbarProps) {
  return (
    <div className="flex items-center justify-between text-2xl font-light">
      <span>Job Tracker</span>
      <RightNavbar
        statuses={statuses}
        setStatuses={setStatuses}
        user={user}
        setUser={setUser}
      />
    </div>
  );
}
