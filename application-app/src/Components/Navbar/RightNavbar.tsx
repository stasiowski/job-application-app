import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { SettingsButton } from "./SettingsButton";
import { UserButton } from "./UserButton";
import {
  SettingsDropdown,
  AccountDropdown,
  AddApplicationDropdown,
} from "./NavbarDropdowns";
import type { StatusProps } from "../../Types/StatusesType";
import type { UserType } from "../../Types/UserType";
import { AddButton } from "./AddButton";

type RightNavbarProps = StatusProps & {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};

export type OpenMenu = "settings" | "account" | "addApplication" | null;

export function RightNavbar({
  statuses,
  setStatuses,
  user,
  setUser,
}: RightNavbarProps) {
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(null);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  function toggleMenu(menu: Exclude<OpenMenu, null>) {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  }

  if (!user) {
    return (
      <Link
        className="text-sm bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
        to="/login"
      >
        Log in
      </Link>
    );
  } else {
    return (
      <div ref={navbarRef} className="flex items-center gap-3">
        <div className="flex">
          <AddButton
            handleClick={() => {
              toggleMenu("addApplication");
            }}
          />
          {openMenu === "addApplication" && (
            <AddApplicationDropdown setOpenMenu={setOpenMenu} />
          )}
        </div>
        <div className="relative flex">
          <SettingsButton
            handleClick={() => {
              toggleMenu("settings");
            }}
          />
          {openMenu === "settings" && (
            <SettingsDropdown statuses={statuses} setStatuses={setStatuses} />
          )}
        </div>
        <div ref={navbarRef} className="relative flex">
          <UserButton
            handleClick={() => {
              toggleMenu("account");
            }}
          />
          {openMenu === "account" && <AccountDropdown setUser={setUser} />}
        </div>
      </div>
    );
  }
}
