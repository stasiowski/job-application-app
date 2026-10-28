import { Settings2 } from "lucide-react";
export function SettingsButton({ handleClick }: { handleClick: () => void }) {
  return (
    <button className="hover:cursor-pointer" onClick={handleClick}>
      <Settings2 size={32} strokeWidth={1.2} />
    </button>
  );
}
