import { useState } from "react";
import { PlayerSelect } from "@/components/PlayerSelect";
import { GameBoard } from "@/components/GameBoard";
import { PlayerHand } from "@/components/PlayerHand";
import { Card, ChromalinkGame, Position } from "@/lib/game";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [game, setGame] = useState<ChromalinkGame | null>(null);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const { toast } = useToast();

  const handlePlayerSelect = (numPlayers: number, playerNames: string[]) => {
    setGame(new ChromalinkGame(numPlayers, playerNames));
  };

  const handleCardSelect = (card: Card) => {
    setSelectedCard(card);
  };

  const handleCardDrop = (position: Position) => {
    if (!game || !selectedCard) return;

    if (game.placeCard(position, selectedCard)) {
      setSelectedCard(null);
      
      // Create a new instance to trigger re-render
      const newGame = new ChromalinkGame(game.players.length, game.players.map(p => p.name));
      newGame.players = game.players;
      newGame.currentPlayer = game.currentPlayer;
      newGame.grid = game.grid;
      newGame.deck = game.deck;
      newGame.remainingCards = game.remainingCards;
      setGame(newGame);

      if (game.isGameOver()) {
        const winner = game.getWinner();
        if (winner) {
          toast({
            title: "Game Over!",
            description: `${winner.name} wins with ${winner.score} points!`,
          });
        }
      }
    } else {
      toast({
        title: "Invalid move",
        description: "This move is not allowed according to the game rules",
        variant: "destructive",
      });
    }
  };

  const handleSwapCards = () => {
    if (!game) return;
    
    const currentPlayer = game.players[game.currentPlayer];
    const selectedCards = currentPlayer.hand.slice(0, 2).map(card => card.id);
    
    if (game.swapCards(selectedCards)) {
      // Create a new instance to trigger re-render
      const newGame = new ChromalinkGame(game.players.length, game.players.map(p => p.name));
      newGame.players = game.players;
      newGame.currentPlayer = game.currentPlayer;
      newGame.grid = game.grid;
      newGame.deck = game.deck;
      newGame.remainingCards = game.remainingCards;
      setGame(newGame);
      
      toast({
        title: "Cards swapped",
        description: "Selected cards have been swapped with new ones from the deck",
      });
    } else {
      toast({
        title: "Cannot swap cards",
        description: "Not enough cards in the deck or invalid selection",
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
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">Tinaiota</h1>
          <div className="bg-primary/10 px-4 py-2 rounded-lg">
            <span className="font-medium">Cards in deck: {game.remainingCards}</span>
          </div>
        </div>
        
        <GameBoard grid={game.grid} onDrop={handleCardDrop} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {game.players.map((player, index) => (
            <PlayerHand
              key={player.id}
              player={player}
              isActive={index === game.currentPlayer}
              onCardSelect={handleCardSelect}
              onSwapCards={handleSwapCards}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;