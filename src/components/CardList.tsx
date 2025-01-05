import { Card } from "@/lib/game";
import { GameCard } from "./GameCard";

interface CardListProps {
  cards: Card[];
  isHidden: boolean;
  isActive: boolean;
  isSwapMode: boolean;
  selectedForSwap: Set<string>;
  onCardSelect: (card: Card) => void;
  onCardClick: (cardId: string) => void;
}

export const CardList = ({
  cards,
  isHidden,
  isActive,
  isSwapMode,
  selectedForSwap,
  onCardSelect,
  onCardClick,
}: CardListProps) => {
  return (
    <div className={`flex gap-2 flex-wrap transition-all duration-300 ${isHidden ? "opacity-0" : "opacity-100"}`}>
      {cards.map((card) => (
        <div 
          key={card.id} 
          className={`w-16 h-24 relative transition-transform duration-300 ${
            selectedForSwap.has(card.id) ? "ring-2 ring-primary -translate-y-2" : ""
          }`}
          onClick={() => onCardClick(card.id)}
        >
          <GameCard 
            card={card} 
            draggable={isActive && !isSwapMode} 
            onDragStart={onCardSelect}
          />
        </div>
      ))}
    </div>
  );
};