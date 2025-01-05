import { Card, Player } from "@/lib/game";
import { useState, useEffect } from "react";
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
  const [previousIsActive, setPreviousIsActive] = useState(isActive);
  
  // Auto-hide cards when player's turn ends
  useEffect(() => {
    if (previousIsActive && !isActive) {
      console.log('Turn ended, auto-hiding cards for player:', player.name);
      setIsHidden(true);
    }
    setPreviousIsActive(isActive);
  }, [isActive, player.name]);

  const handleDragStart = (card: Card) => {
    console.log('Card drag started:', card.id);
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
    console.log('Card selection toggled:', cardId, 'Selected cards:', Array.from(newSelection));
  };

  const handleSwap = () => {
    if (selectedForSwap.size === 2 && onSwapCards && !hasSwappedThisTurn) {
      console.log('Executing card swap for player:', player.name);
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