import { Card } from "@/lib/game";
import { useState } from "react";

interface CardSelectionHandlerProps {
  isActive: boolean;
  onSwapCards?: () => void;
  children: (props: {
    selectedForSwap: Set<string>;
    isSwapMode: boolean;
    hasSwappedThisTurn: boolean;
    handleDragStart: (card: Card) => void;
    toggleCardSelection: (cardId: string) => void;
    handleSwap: () => void;
    setIsSwapMode: (value: boolean) => void;
    setSelectedForSwap: (value: Set<string>) => void;
  }) => React.ReactNode;
}

export const CardSelectionHandler = ({ 
  isActive, 
  onSwapCards, 
  children 
}: CardSelectionHandlerProps) => {
  const [selectedForSwap, setSelectedForSwap] = useState<Set<string>>(new Set());
  const [isSwapMode, setIsSwapMode] = useState(false);
  const [hasSwappedThisTurn, setHasSwappedThisTurn] = useState(false);

  const handleDragStart = (card: Card) => {
    console.log('Card drag started:', card.id);
    // Remove the automatic swap trigger from here
  };

  const toggleCardSelection = (cardId: string) => {
    if (!isSwapMode || hasSwappedThisTurn) return;
    
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
      console.log('Executing card swap');
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

  return children({
    selectedForSwap,
    isSwapMode,
    hasSwappedThisTurn,
    handleDragStart,
    toggleCardSelection,
    handleSwap,
    setIsSwapMode,
    setSelectedForSwap
  });
};