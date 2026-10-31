import { Settings2 } from "lucide-react";

type SettingsButtonProps = {
  handleClick: () => void;
};
export function SettingsButton({ handleClick }: SettingsButtonProps) {
  return (
    <button className="hover:cursor-pointer" onClick={handleClick}>
      <Settings2 size={32} strokeWidth={1.2} />
    </button>
  );
}
