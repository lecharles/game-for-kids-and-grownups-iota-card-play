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
        className={`absolute inset-0 rounded-lg bg-card-${card.color} bg-opacity-20 flex items-center justify-center`}
      >
        <div className="relative">
          <ShapeComponent 
            className={`w-8 h-8 text-card-${card.color}`} 
            strokeWidth={2.5}
          />
          <span
            className={`absolute -top-3 -right-3 w-5 h-5 rounded-full bg-card-${card.color} text-white flex items-center justify-center text-xs font-bold`}
          >
            {card.number}
          </span>
        </div>
      </div>
    </div>
  );
};