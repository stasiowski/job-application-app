import { Briefcase, X } from "lucide-react";
import type { OpenMenu } from "../RightNavbar";

export function AddApplicationTopRow({
  setOpenMenu,
}: {
  setOpenMenu: React.Dispatch<React.SetStateAction<OpenMenu>>;
}) {
  return (
    <div className="top-bar px-6">
      <div className="justify-between flex items-center px-4 py-3 rounded-lg bg-slate-100 text-slate-900">
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
  );
}
