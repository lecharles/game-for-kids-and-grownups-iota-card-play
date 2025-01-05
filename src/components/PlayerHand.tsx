import { Card, Player } from "@/lib/game";
import { useState } from "react";
import { PlayerHandHeader } from "./PlayerHandHeader";
import { CardList } from "./CardList";
import { SwapControls } from "./SwapControls";

interface PlayerHandProps {
  player: Player;
  isActive: boolean;
  onCardSelect: (card: Card) => void;
  onSwapCards?: () => void;
}

export const PlayerHand = ({ 
  player, 
  isActive, 
  onCardSelect, 
  onSwapCards 
}: PlayerHandProps) => {
  const [selectedForSwap, setSelectedForSwap] = useState<Set<string>>(new Set());
  const [isHidden, setIsHidden] = useState(true);
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

  // Reset swap state when player becomes active (new turn)
  if (isActive && hasSwappedThisTurn) {
    setHasSwappedThisTurn(false);
  }

  return (
    <div className={`p-4 rounded-lg ${isActive ? "bg-primary bg-opacity-10" : "bg-gray-50"}`}>
      <PlayerHandHeader
        playerName={player.name}
        score={player.score}
        isHidden={isHidden}
        onToggleVisibility={() => setIsHidden(!isHidden)}
      />
      
      <CardList
        cards={player.hand}
        isHidden={isHidden}
        isActive={isActive}
        isSwapMode={isSwapMode}
        selectedForSwap={selectedForSwap}
        onCardSelect={handleDragStart}
        onCardClick={toggleCardSelection}
      />
      
      <SwapControls
        isActive={isActive}
        isSwapMode={isSwapMode}
        hasSwappedThisTurn={hasSwappedThisTurn}
        selectedCount={selectedForSwap.size}
        onStartSwap={() => setIsSwapMode(true)}
        onExecuteSwap={handleSwap}
        onCancelSwap={() => {
          setIsSwapMode(false);
          setSelectedForSwap(new Set());
        }}
      />
    </div>
  );
};