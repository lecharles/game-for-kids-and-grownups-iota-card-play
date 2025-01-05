import { Card, Position } from "@/lib/game";
import { GameCard } from "./GameCard";

interface GameBoardProps {
  grid: Map<string, Card>;
  onDrop: (position: Position) => void;
}

export const GameBoard = ({ grid, onDrop }: GameBoardProps) => {
  const handleDrop = (e: React.DragEvent, x: number, y: number) => {
    e.preventDefault();
    onDrop({ x, y });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="relative w-full h-[600px] bg-gray-100 rounded-lg overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
        {Array.from({ length: 64 }, (_, i) => {
          const x = i % 8;
          const y = Math.floor(i / 8);
          const card = grid.get(`${x},${y}`);

          return (
            <div
              key={`${x}-${y}`}
              className={`border border-gray-200 p-1 ${x === 4 && y === 4 ? 'bg-primary/10' : ''}`}
              onDrop={(e) => handleDrop(e, x, y)}
              onDragOver={handleDragOver}
            >
              {card && <GameCard card={card} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};