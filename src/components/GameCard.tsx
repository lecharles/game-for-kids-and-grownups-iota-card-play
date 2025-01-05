import { Card } from "@/lib/game";
import { Circle, X, Square, Triangle } from "lucide-react";

interface GameCardProps {
  card: Card;
  draggable?: boolean;
  onDragStart?: (card: Card) => void;
}

const ShapeMap = {
  circle: Circle,
  square: Square,
  triangle: Triangle,
  cross: X,
};

export const GameCard = ({ card, draggable = false, onDragStart }: GameCardProps) => {
  const ShapeComponent = ShapeMap[card.shape];

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('cardId', card.id);
    if (onDragStart) onDragStart(card);
  };

  return (
    <div
      draggable={draggable}
      onDragStart={handleDragStart}
      className={`relative w-full h-full rounded-lg bg-white shadow-md transition-transform hover:scale-105 cursor-pointer ${
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