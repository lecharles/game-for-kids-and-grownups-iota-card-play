import { Card, Player } from "@/lib/game";
import { GameCard } from "./GameCard";
import { Button } from "./ui/button";
import { useState } from "react";

interface PlayerHandProps {
  player: Player;
  isActive: boolean;
  onCardSelect: (card: Card) => void;
  onSwapCards?: () => void;
}

export const PlayerHand = ({ player, isActive, onCardSelect, onSwapCards }: PlayerHandProps) => {
  const [selectedForSwap, setSelectedForSwap] = useState<Set<string>>(new Set());
  
  const handleDragStart = (card: Card) => {
    onCardSelect(card);
  };

  const toggleCardSelection = (cardId: string) => {
    const newSelection = new Set(selectedForSwap);
    if (newSelection.has(cardId)) {
      newSelection.delete(cardId);
    } else if (newSelection.size < 2) {
      newSelection.add(cardId);
    }
    setSelectedForSwap(newSelection);
  };

  const handleSwap = () => {
    if (selectedForSwap.size === 2 && onSwapCards) {
      onSwapCards();
      setSelectedForSwap(new Set());
    }
  };

  return (
    <div className={`p-4 rounded-lg ${isActive ? "bg-primary bg-opacity-10" : "bg-gray-50"}`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">{player.name}</h3>
        <span className="text-sm">Score: {player.score}</span>
      </div>
      <div className="flex gap-2 flex-wrap">
        {player.hand.map((card) => (
          <div 
            key={card.id} 
            className={`w-16 h-24 relative ${
              selectedForSwap.has(card.id) ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => toggleCardSelection(card.id)}
          >
            <GameCard 
              card={card} 
              draggable={isActive} 
              onDragStart={handleDragStart}
            />
          </div>
        ))}
      </div>
      {isActive && (
        <div className="mt-2">
          <Button
            onClick={handleSwap}
            disabled={selectedForSwap.size !== 2}
            variant="outline"
            size="sm"
          >
            Swap Selected Cards
          </Button>
        </div>
      )}
    </div>
  );
};