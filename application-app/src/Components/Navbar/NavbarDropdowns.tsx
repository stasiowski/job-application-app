import { ChevronRight } from "lucide-react";
import { useState } from "react";
import type { StatusProps } from "../../Types/StatusesType";

export function SettingsDropdown({ statuses, setStatuses }: StatusProps) {
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

export function AccountDropdown() {
  return (
    <div className="absolute right-0 top-full z-50 mt-1 flex w-36 flex-col gap-3.5 rounded-lg bg-white p-3 text-sm shadow-md">
      <a>Profile</a>
      <a>Log out</a>
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
