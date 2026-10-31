import { CircleUserRound } from "lucide-react";

type UserButtonProps = {
  handleClick: () => void;
};

export function UserButton({ handleClick }: UserButtonProps) {
  return (
    <button className="hover:cursor-pointer" onClick={handleClick}>
      <CircleUserRound strokeWidth={1.399} size={28} />
    </button>
  );
}
