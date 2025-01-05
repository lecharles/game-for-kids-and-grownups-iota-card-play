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
  const [isHidden, setIsHidden] = useState(true); // Start hidden by default
  const [isSwapMode, setIsSwapMode] = useState(false);
  const [hasSwappedThisTurn, setHasSwappedThisTurn] = useState(false);
  
  const handleDragStart = (card: Card) => {
    onCardSelect(card);
  };

  const toggleCardSelection = (cardId: string) => {
    if (!isSwapMode) return;
    
    const newSelection = new Set(selectedForSwap);
    if (newSelection.has(cardId)) {
      newSelection.delete(cardId);
    } else if (newSelection.size < 2) {
      newSelection.add(cardId);
    }
    setSelectedForSwap(newSelection);
  };

  const handleSwap = () => {
    if (selectedForSwap.size === 2 && onSwapCards && !hasSwappedThisTurn) {
      onSwapCards();
      setSelectedForSwap(new Set());
      setIsSwapMode(false);
      setHasSwappedThisTurn(true);
    }
  };

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  // Reset swap state when player becomes active (new turn)
  if (isActive && hasSwappedThisTurn) {
    setHasSwappedThisTurn(false);
  }

  return (
    <div className={`p-4 rounded-lg ${isActive ? "bg-primary bg-opacity-10" : "bg-gray-50"}`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">{player.name}</h3>
        <div className="flex gap-2">
          <span className="text-sm">Score: {player.score}</span>
          <Button
            onClick={toggleVisibility}
            variant="outline"
            size="sm"
          >
            {isHidden ? "Show Cards" : "Hide Cards"}
          </Button>
        </div>
      </div>
      <div className={`flex gap-2 flex-wrap transition-all duration-300 ${isHidden ? "opacity-0" : "opacity-100"}`}>
        {player.hand.map((card) => (
          <div 
            key={card.id} 
            className={`w-16 h-24 relative transition-transform duration-300 ${
              selectedForSwap.has(card.id) ? "ring-2 ring-primary -translate-y-2" : ""
            }`}
            onClick={() => toggleCardSelection(card.id)}
          >
            <GameCard 
              card={card} 
              draggable={isActive && !isSwapMode} 
              onDragStart={handleDragStart}
            />
          </div>
        ))}
      </div>
      {isActive && (
        <div className="mt-2 flex gap-2">
          {!isSwapMode ? (
            <Button
              onClick={() => setIsSwapMode(true)}
              variant="outline"
              size="sm"
              disabled={hasSwappedThisTurn}
            >
              {hasSwappedThisTurn ? "Already Swapped" : "Swap Cards"}
            </Button>
          ) : (
            <>
              <Button
                onClick={handleSwap}
                disabled={selectedForSwap.size !== 2}
                variant="default"
                size="sm"
              >
                Execute Swap
              </Button>
              <Button
                onClick={() => {
                  setIsSwapMode(false);
                  setSelectedForSwap(new Set());
                }}
                variant="outline"
                size="sm"
              >
                Cancel
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};