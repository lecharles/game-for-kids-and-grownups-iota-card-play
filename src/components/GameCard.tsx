import { Card } from "@/lib/game";
import { Circle, X, Square, Triangle } from "lucide-react";

interface GameCardProps {
  card: Card;
  draggable?: boolean;
  onDragStart?: (card: Card) => void;
  isWildcard?: boolean;
}

const ShapeMap = {
  circle: Circle,
  square: Square,
  triangle: Triangle,
  cross: X,
};

export const GameCard = ({ card, draggable = false, onDragStart, isWildcard = false }: GameCardProps) => {
  const ShapeComponent = ShapeMap[card.shape];

  const handleDragStart = (e: React.DragEvent) => {
    console.log('Starting drag for card:', card.id);
    e.dataTransfer.setData('text/plain', card.id);
    e.dataTransfer.effectAllowed = 'move';
    if (onDragStart) onDragStart(card);
  };

  if (isWildcard) {
    return (
      <div
        draggable={draggable}
        onDragStart={handleDragStart}
        className="relative w-full h-full rounded-lg bg-white shadow-md transition-transform hover:scale-105 cursor-pointer select-none"
      >
        <div className="absolute inset-0 rounded-lg grid grid-cols-2 grid-rows-2 overflow-hidden">
          <div className="bg-card-red flex items-center justify-center">
            <Circle className="w-4 h-4 text-white" />
          </div>
          <div className="bg-card-blue flex items-center justify-center">
            <Square className="w-4 h-4 text-white" />
          </div>
          <div className="bg-card-green flex items-center justify-center">
            <Triangle className="w-4 h-4 text-white" />
          </div>
          <div className="bg-card-yellow flex items-center justify-center">
            <X className="w-4 h-4 text-white" />
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
          1-4
        </div>
      </div>
    );
  }

  return (
    <div
      draggable={draggable}
      onDragStart={handleDragStart}
      className={`relative w-full h-full rounded-lg bg-white shadow-md transition-transform hover:scale-105 cursor-pointer select-none ${
        draggable ? 'hover:animate-card-hover' : ''
      }`}
    >
      <div
        className={`absolute inset-0 rounded-lg flex items-center justify-center`}
        style={{ backgroundColor: `var(--card-${card.color})` }}
      >
        <div className="relative">
          <ShapeComponent 
            className="w-8 h-8 text-white"
            strokeWidth={3}
          />
          <div
            className={`absolute -top-3 -right-3 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-white bg-opacity-80`}
            style={{ backgroundColor: `var(--card-${card.color})` }}
          >
            {card.number}
          </div>
        </div>
      </div>
    </div>
  );
};