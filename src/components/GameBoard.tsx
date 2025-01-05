import { Card, Position } from "@/lib/game";
import { GameCard } from "./GameCard";
import { useState } from "react";

interface GameBoardProps {
  grid: Map<string, Card>;
  onDrop: (position: Position, cardId: string) => void;
}

export const GameBoard = ({ grid, onDrop }: GameBoardProps) => {
  const [draggedOver, setDraggedOver] = useState<string | null>(null);

  const handleDrop = (e: React.DragEvent, x: number, y: number) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('cardId');
    console.log('Dropping card:', cardId, 'at position:', x, y);
    if (cardId) {
      onDrop({ x, y }, cardId);
      setDraggedOver(null);
    }
  };

  const handleDragOver = (e: React.DragEvent, position: string) => {
    e.preventDefault();
    const card = grid.get(position);
    if (!card) {
      e.dataTransfer.dropEffect = 'move';
      setDraggedOver(position);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedOver(null);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="relative w-full h-[600px] bg-gray-100 rounded-lg overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
        {Array.from({ length: 64 }, (_, i) => {
          const x = i % 8;
          const y = Math.floor(i / 8);
          const position = `${x},${y}`;
          const card = grid.get(position);
          const isCenter = x === 4 && y === 4;
          const isDraggedOver = draggedOver === position;

          return (
            <div
              key={`${x}-${y}`}
              className={`border border-gray-200 p-1 relative
                ${isCenter ? 'bg-primary/10' : ''}
                ${!card ? 'hover:bg-gray-200' : ''}
                ${isDraggedOver && !card ? 'bg-gray-200' : ''}`}
              onDrop={(e) => handleDrop(e, x, y)}
              onDragOver={(e) => handleDragOver(e, position)}
              onDragLeave={handleDragLeave}
              onDragEnter={handleDragEnter}
            >
              {card ? (
                <GameCard card={card} />
              ) : (
                isDraggedOver && (
                  <div className="absolute inset-0 flex items-center justify-center text-4xl text-gray-400">
                    +
                  </div>
                )
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};