import { Card, Player } from "@/lib/game";
import { GameCard } from "./GameCard";

interface PlayerHandProps {
  player: Player;
  isActive: boolean;
  onCardSelect: (card: Card) => void;
}

export const PlayerHand = ({ player, isActive, onCardSelect }: PlayerHandProps) => {
  return (
    <div className={`p-4 rounded-lg ${isActive ? "bg-primary bg-opacity-10" : "bg-gray-50"}`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">{player.name}</h3>
        <span className="text-sm">Score: {player.score}</span>
      </div>
      <div className="flex gap-2">
        {player.hand.map((card) => (
          <div key={card.id} className="w-16 h-24" onClick={() => onCardSelect(card)}>
            <GameCard card={card} draggable={isActive} />
          </div>
        ))}
      </div>
    </div>
  );
};