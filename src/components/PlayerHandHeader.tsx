import { Button } from "./ui/button";

interface PlayerHandHeaderProps {
  playerName: string;
  score: number;
  isHidden: boolean;
  onToggleVisibility: () => void;
}

export const PlayerHandHeader = ({ 
  playerName, 
  score, 
  isHidden, 
  onToggleVisibility 
}: PlayerHandHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-2">
      <h3 className="font-bold">{playerName}</h3>
      <div className="flex gap-2">
        <span className="text-sm">Score: {score}</span>
        <Button
          onClick={onToggleVisibility}
          variant="outline"
          size="sm"
        >
          {isHidden ? "Show Cards" : "Hide Cards"}
        </Button>
      </div>
    </div>
  );
};