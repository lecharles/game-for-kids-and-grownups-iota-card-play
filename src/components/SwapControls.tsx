import { Button } from "./ui/button";

interface SwapControlsProps {
  isActive: boolean;
  isSwapMode: boolean;
  hasSwappedThisTurn: boolean;
  selectedCount: number;
  onStartSwap: () => void;
  onExecuteSwap: () => void;
  onCancelSwap: () => void;
}

export const SwapControls = ({
  isActive,
  isSwapMode,
  hasSwappedThisTurn,
  selectedCount,
  onStartSwap,
  onExecuteSwap,
  onCancelSwap,
}: SwapControlsProps) => {
  if (!isActive) return null;

  return (
    <div className="mt-2 flex gap-2">
      {!isSwapMode ? (
        <Button
          onClick={onStartSwap}
          variant="outline"
          size="sm"
          disabled={hasSwappedThisTurn}
        >
          {hasSwappedThisTurn ? "Already Swapped" : "Swap Cards"}
        </Button>
      ) : (
        <>
          <Button
            onClick={onExecuteSwap}
            disabled={selectedCount !== 2}
            variant="default"
            size="sm"
          >
            Execute Swap
          </Button>
          <Button
            onClick={onCancelSwap}
            variant="outline"
            size="sm"
          >
            Cancel
          </Button>
        </>
      )}
    </div>
  );
};