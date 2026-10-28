import { useEffect, useState, useRef } from "react";
import { SettingsButton } from "./SettingsButton";
import { UserButton } from "./UserButton";
import { SettingsDropdown, AccountDropdown } from "./NavbarDropdowns";
import type { StatusProps } from "../../Types/StatusesType";
type OpenMenu = "settings" | "account" | null;

export function RightNavbar({ statuses, setStatuses }: StatusProps) {
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

  return (
    <div ref={navbarRef} className="flex items-center gap-3">
      <div className="relative">
        <SettingsButton
          handleClick={() => {
            toggleMenu("settings");
          }}
        />
        {openMenu === "settings" && (
          <SettingsDropdown statuses={statuses} setStatuses={setStatuses} />
        )}
      </div>
      <div ref={navbarRef} className="relative">
        <UserButton
          handleClick={() => {
            toggleMenu("account");
          }}
        />
        {openMenu === "account" && <AccountDropdown />}
      </div>
    </div>
  );
}
