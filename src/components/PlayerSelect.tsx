import { Button } from "@/components/ui/button";
import { useState } from "react";

interface PlayerSelectProps {
  onSelect: (players: number) => void;
}

export const PlayerSelect = ({ onSelect }: PlayerSelectProps) => {
  const [selected, setSelected] = useState<number>(2);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold text-primary">Chromalink</h1>
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

        <Button
          onClick={() => onSelect(selected)}
          className="px-8 py-2 bg-primary hover:bg-primary/90"
        >
          Start Game
        </Button>
      </div>
    </div>
  );
};