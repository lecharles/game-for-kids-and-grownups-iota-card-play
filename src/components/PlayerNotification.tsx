import { toast } from "@/hooks/use-toast";
import { X } from "lucide-react";

interface NotificationProps {
  message: string;
  playerId: number;
}

export const showPlayerNotification = ({ message, playerId }: NotificationProps) => {
  toast({
    title: `Player ${playerId + 1}`,
    description: message,
    action: (
      <button
        onClick={() => toast.dismiss()}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        <X className="h-4 w-4" />
      </button>
    ),
  });
};