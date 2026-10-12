import { useEffect, useRef, useState } from "react";
import { CircleUserRound, LogOut, User } from "lucide-react";

type AccountMenuProps = {
  onProfile?: () => void;
  onSignOut?: () => void;
};

export function AccountMenu({ onProfile, onSignOut }: AccountMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape while the menu is open
  useEffect(() => {
    if (!open) return;

    function handleClick(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  function handleSelect(action?: () => void) {
    setOpen(false);
    action?.();
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Account menu"
        aria-haspopup="menu"
        aria-expanded={open}
        className="cursor-pointer rounded-full p-1 text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
      >
        <CircleUserRound size={28} strokeWidth={1.5} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-10 mt-2 w-44 rounded-lg border border-slate-200 bg-white py-1 shadow-lg"
        >
          <button
            type="button"
            role="menuitem"
            onClick={() => handleSelect(onProfile)}
            className="cursor-pointer flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 focus-visible:bg-slate-100 focus-visible:outline-none"
          >
            <User size={16} />
            Profile
          </button>
          <div className="my-1 border-t border-slate-200" />
          <button
            type="button"
            role="menuitem"
            onClick={() => handleSelect(onSignOut)}
            className="cursor-pointer flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 focus-visible:bg-slate-100 focus-visible:outline-none"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
