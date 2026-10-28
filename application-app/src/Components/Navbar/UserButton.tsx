import { CircleUserRound } from "lucide-react";

export function UserButton({ handleClick }: { handleClick: () => void }) {
  return (
    <button className="hover:cursor-pointer" onClick={handleClick}>
      <CircleUserRound strokeWidth={1.399} size={28} />
    </button>
  );
}
