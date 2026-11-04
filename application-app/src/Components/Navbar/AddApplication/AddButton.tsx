import { Plus } from "lucide-react";

type AddButtonProps = {
  handleClick: () => void;
};

export function AddButton({ handleClick }: AddButtonProps) {
  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-1 text-white text-sm font-normal px-2.5 py-1.5 cursor-pointer bg-blue-500 hover:bg-blue-600 rounded-lg"
    >
      <Plus color="#ffffff" />
      Add Application
    </button>
  );
}
