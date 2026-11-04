import { ChevronRight } from "lucide-react";
import { useState } from "react";
import type { StatusProps } from "../../Types/StatusesType";
import type { UserType } from "../../Types/UserType";
import { setToken } from "../../Services/requests";
import type { OpenMenu } from "./RightNavbar";
import { AddApplicationFormRow } from "./AddApplication/AddApplicationFormRow";
import { AddApplicationTopRow } from "./AddApplication/AddApplicationTopRow";
import { create } from "../../Services/requests";
import type { ApplicationType } from "../../Types/ApplicationType";
import { dateConvert } from "../../Services/dateConvert";

type NavbarDropdownsProps = StatusProps;

// Returns the dropdown when pressing Add Application
export function AddApplicationDropdown({
  setOpenMenu,
  setApplications,
}: {
  setOpenMenu: React.Dispatch<React.SetStateAction<OpenMenu>>;
  setApplications: React.Dispatch<React.SetStateAction<ApplicationType[]>>;
}) {
  const [title, setTitle] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  async function handleAdd() {
    const application = {
      title: title,
      company: company,
      location: location,
      date: new Date(date),
      status: status,
    };

    let response = await create(application);
    response = dateConvert([response]);
    setApplications((prev) => [...prev, response[0]]);
  }

  return (
    <div className="outer fixed right-0 top-0 bottom-0 h-screen w-140 z-50 bg-white shadow-md">
      <div className="inside flex flex-col gap-4 py-6 h-full">
        {/* Top row  */}
        <AddApplicationTopRow setOpenMenu={setOpenMenu} />
        <div className="bottom-bar flex flex-col flex-1 justify-between px-6">
          {/* Actual Form */}
          <div className="bg-slate-100 text-slate-900 rounded-lg">
            <div className="flex items-center justify-between px-4 py-3 rounded-lg ">
              <AddApplicationFormRow
                title="Position Title"
                placeholder="Title"
                value={title}
                onChange={setTitle}
              />
              <AddApplicationFormRow
                title="Company Name"
                placeholder="Name"
                value={company}
                onChange={setCompany}
              />
            </div>
            <div className="flex items-center gap-9.5 px-4 py-3">
              <AddApplicationFormRow
                title="Location"
                placeholder="Location"
                value={location}
                onChange={setLocation}
              />

              <AddApplicationFormRow
                title="Status"
                placeholder="Status"
                value={status}
                onChange={setStatus}
              />
            </div>
            <div className="flex items-center px-4 pt-3 pb-4 rounded-lg">
              <AddApplicationFormRow
                title="Date"
                placeholder="Date"
                value={date}
                onChange={setDate}
              />
            </div>
          </div>
          {/* Add Form Button */}
          <div className="bg-slate-100 text-slate-900 rounded-lg flex justify-center py-2">
            <button
              className="p-1 px-2 bg-blue-500 cursor-pointer rounded-2xl text-white"
              onClick={handleAdd}
            >
              Add
            </button>
          </div>
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
        //
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

//Dropdown when hovering over visible columns found in settings dropdown
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
