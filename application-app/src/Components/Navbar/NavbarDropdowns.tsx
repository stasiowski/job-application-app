import { ChevronRight, Briefcase, X } from "lucide-react";
import { useState } from "react";
import type { StatusProps } from "../../Types/StatusesType";
import type { UserType } from "../../Types/UserType";
import { setToken } from "../../Services/requests";
import type { OpenMenu } from "./RightNavbar";

type NavbarDropdownsProps = StatusProps;

export function AddApplicationDropdown({
  setOpenMenu,
}: {
  setOpenMenu: React.Dispatch<React.SetStateAction<OpenMenu>>;
}) {
  return (
    <div className="outer fixed right-0 -top-1 -bottom-1 w-140 z-50 mt-1 bg-white shadow-md">
      <div className="inner flex flex-col p-6">
        <div className="1st-col justify-between flex items-center px-4 py-3 rounded-lg bg-slate-100 text-slate-900">
          <div className="flex items-center gap-4">
            <div className="icon bg-blue-500 p-1.5 rounded-3xl">
              <Briefcase size={30} strokeWidth={1.5} color="#ffffff" />
            </div>
            <span className="font-light">Add Application</span>
          </div>
          <button
            onClick={() => {
              setOpenMenu(null);
            }}
            className="p-2 cursor-pointer"
          >
            <X size={30} strokeWidth={1.2} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function SettingsDropdown({
  statuses,
  setStatuses,
}: NavbarDropdownsProps) {
  const [toggleVisibleCol, setToggleVisibleCol] = useState(false);

  function handleLeave() {
    setToggleVisibleCol(false);
  }

  return (
    // dropdown
    <div className="absolute right-0 top-full z-50 mt-1 flex w-52 flex-col p-2 gap-2 rounded-lg bg-white text-sm shadow-md">
      <div className="relative">
        <div
          onMouseEnter={() => {
            setToggleVisibleCol(true);
          }}
          className="flex justify-between cursor-pointer p-1"
        >
          <span className="text-left">Visible Columns</span>
          <ChevronRight size={21} strokeWidth={1} />
        </div>
        {toggleVisibleCol && (
          <VisibleColumnsDropdown
            handleLeave={handleLeave}
            statuses={statuses}
            setStatuses={setStatuses}
          />
        )}
      </div>
    </div>
  );
}

export function AccountDropdown({
  setUser,
}: {
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}) {
  function handleLogOut() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
  }
  return (
    <div className="absolute right-0 top-full z-50 mt-1 flex w-36 flex-col gap-3.5 rounded-lg bg-white p-3 text-sm shadow-md">
      <a className="cursor-pointer">Profile</a>
      <a className="cursor-pointer" onClick={handleLogOut}>
        Log out
      </a>
    </div>
  );
}

type ColumnDropdownProps = StatusProps & {
  handleLeave: () => void;
};

export function VisibleColumnsDropdown({
  handleLeave,
  statuses,
  setStatuses,
}: ColumnDropdownProps) {
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>,
    key: keyof typeof statuses,
  ) {
    setStatuses((prev) => ({
      ...prev,
      [key]: event.target.checked,
    }));
    console.log(event.target.checked, key);
  }

  return (
    <div
      onMouseLeave={handleLeave}
      className="absolute right-full top-0 z-50 -mt-2 mr-2 flex w-48 flex-col gap-3 rounded-lg bg-white p-3 text-sm shadow-md"
    >
      {Object.keys(statuses).map((status) => {
        const key = status as keyof typeof statuses;
        return (
          <label key={key} className="flex items-center gap-2 justify-between">
            {status}
            <input
              type="checkbox"
              checked={statuses[key]}
              onChange={(event) => {
                handleChange(event, key);
              }}
            />
          </label>
        );
      })}
    </div>
  );
}
