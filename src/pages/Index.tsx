import { useState } from "react";
import { PlayerSelect } from "@/components/PlayerSelect";
import { GameBoard } from "@/components/GameBoard";
import { PlayerHand } from "@/components/PlayerHand";
import { Card, ChromalinkGame, Position } from "@/lib/game";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [game, setGame] = useState<ChromalinkGame | null>(null);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const { toast } = useToast();

  const handlePlayerSelect = (numPlayers: number) => {
    setGame(new ChromalinkGame(numPlayers));
  };

  const handleCardSelect = (card: Card) => {
    setSelectedCard(card);
  };

  const handleCardDrop = (position: Position) => {
    if (!game || !selectedCard) return;

    if (game.placeCard(position, selectedCard)) {
      setSelectedCard(null);
      // Create a new instance of the game to trigger a re-render
      const newGame = new ChromalinkGame(game.players.length);
      newGame.players = game.players;
      newGame.currentPlayer = game.currentPlayer;
      newGame.grid = game.grid;
      setGame(newGame);
    } else {
      toast({
        title: "Invalid move",
        description: "You cannot place a card there",
        variant: "destructive",
      });
    }
  };

  if (!game) {
    return <PlayerSelect onSelect={handlePlayerSelect} />;
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-primary text-center">Chromalink</h1>
        
        <GameBoard grid={game.grid} onDrop={handleCardDrop} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {game.players.map((player, index) => (
            <PlayerHand
              key={player.id}
              player={player}
              isActive={index === game.currentPlayer}
              onCardSelect={handleCardSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;