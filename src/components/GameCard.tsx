import { Card } from "@/lib/game";
import { Circle, Plus, Square, Triangle } from "lucide-react";

interface GameCardProps {
  card: Card;
  draggable?: boolean;
  onDragStart?: () => void;
}

const ShapeMap = {
  circle: Circle,
  square: Square,
  triangle: Triangle,
  plus: Plus,
};

export const GameCard = ({ card, draggable = false, onDragStart }: GameCardProps) => {
  const ShapeComponent = ShapeMap[card.shape];

  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      className={`relative w-full h-full rounded-lg bg-white shadow-md transition-transform hover:scale-105 cursor-pointer`}
    >
      <div
        className={`absolute inset-0 rounded-lg bg-card-${card.color} bg-opacity-20 flex items-center justify-center`}
      >
        <div className="relative">
          <ShapeComponent className={`w-6 h-6 text-card-${card.color}`} />
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