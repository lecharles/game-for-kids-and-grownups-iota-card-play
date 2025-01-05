import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface PlayerSelectProps {
  onSelect: (players: number, names: string[]) => void;
}

export const PlayerSelect = ({ onSelect }: PlayerSelectProps) => {
  const [selected, setSelected] = useState<number>(2);
  const [playerNames, setPlayerNames] = useState<string[]>(Array(4).fill(""));

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const handleSubmit = () => {
    const names = playerNames.slice(0, selected).map((name, index) => 
      name.trim() || `Player ${index + 1}`
    );
    onSelect(selected, names);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="text-center space-y-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-primary">Tinaiota</h1>
        
        <div className="bg-gray-50 p-4 rounded-lg text-left text-sm text-gray-600">
          <p>
            Welcome to Tinaiota! Match cards by color, shape, or number to score points. 
            Place cards next to matching ones on the grid. Each player can swap up to 2 cards 
            once per turn. Remember to show your cards when it's your turn since they start hidden. 
            The player with the highest score wins!
          </p>
        </div>
        
        <p className="text-lg text-gray-600">Select number of players</p>
        
        <div className="flex gap-4 justify-center">
          {[2, 3, 4].map((num) => (
            <button
              key={num}
              onClick={() => setSelected(num)}
              className={`w-16 h-16 rounded-lg text-xl font-bold transition-all duration-200 ${
                selected === num
                  ? "bg-primary text-white scale-110"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {num}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {Array.from({ length: selected }).map((_, index) => (
            <div key={index} className="flex gap-2 items-center">
              <label className="text-sm text-gray-600 w-24">Player {index + 1}:</label>
              <Input
                value={playerNames[index]}
                onChange={(e) => handleNameChange(index, e.target.value)}
                placeholder={`Player ${index + 1}`}
                className="flex-1"
              />
            </div>
          ))}
        </div>

        <Button
          onClick={handleSubmit}
          className="px-8 py-2 bg-primary hover:bg-primary/90"
        >
          Start Game
        </Button>
      </div>
    </div>
  );
};
