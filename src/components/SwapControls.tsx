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
          className={hasSwappedThisTurn ? "opacity-50 cursor-not-allowed" : ""}
        >
          {hasSwappedThisTurn ? "Already Swapped This Turn" : "Swap Cards"}
        </Button>
      ) : (
        <>
          <Button
            onClick={onExecuteSwap}
            disabled={selectedCount !== 2 || hasSwappedThisTurn}
            variant="default"
            size="sm"
            className={hasSwappedThisTurn ? "opacity-50 cursor-not-allowed" : ""}
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