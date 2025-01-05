import { Card, Player } from "@/lib/game";
import { useState, useEffect } from "react";
import { PlayerHandHeader } from "./PlayerHandHeader";
import { CardList } from "./CardList";
import { SwapControls } from "./SwapControls";
import { CardSelectionHandler } from "./CardSelectionHandler";
import { showPlayerNotification } from "./PlayerNotification";

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
  const [isHidden, setIsHidden] = useState(true);
  const [previousIsActive, setPreviousIsActive] = useState(isActive);
  
  useEffect(() => {
    if (previousIsActive && !isActive) {
      console.log('Turn ended, auto-hiding cards for player:', player.name);
      setIsHidden(true);
      showPlayerNotification({ 
        message: "Your turn has ended", 
        playerId: player.id 
      });
    }
    setPreviousIsActive(isActive);
  }, [isActive, player.name, player.id]);

  return (
    <div className={`p-4 rounded-lg ${isActive ? "bg-primary bg-opacity-10" : "bg-gray-50"}`}>
      <PlayerHandHeader
        playerName={player.name}
        score={player.score}
        isHidden={isHidden}
        onToggleVisibility={() => setIsHidden(!isHidden)}
      />
      
      <CardSelectionHandler
        isActive={isActive}
        onSwapCards={onSwapCards}
      >
        {({
          selectedForSwap,
          isSwapMode,
          hasSwappedThisTurn,
          handleDragStart,
          toggleCardSelection,
          handleSwap,
          setIsSwapMode,
          setSelectedForSwap
        }) => (
          <>
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
          </>
        )}
      </CardSelectionHandler>
    </div>
  );
};