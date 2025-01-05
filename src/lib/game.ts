import { Card, Player, Position } from './types';
import { createDeck, shuffleDeck } from './deck';
import { isValidMove } from './validation';
import { calculateScore } from './scoring';

export class ChromalinkGame {
  public deck: Card[] = [];
  public players: Player[] = [];
  public currentPlayer = 0;
  public grid: Map<string, Card> = new Map();

  constructor(numPlayers: number) {
    this.initializeDeck();
    this.initializePlayers(numPlayers);
  }

  private initializeDeck() {
    this.deck = shuffleDeck(createDeck());
  }

  private initializePlayers(numPlayers: number) {
    for (let i = 0; i < numPlayers; i++) {
      this.players.push({
        id: i,
        name: `Player ${i + 1}`,
        hand: this.drawCards(4),
        score: 0,
      });
    }
  }

  private drawCards(count: number): Card[] {
    return this.deck.splice(0, count);
  }

  public placeCard(position: Position, card: Card): boolean {
    if (!isValidMove(position, card, this.grid)) {
      return false;
    }

    const key = `${position.x},${position.y}`;
    this.grid.set(key, card);

    // Remove card from player's hand
    const player = this.players[this.currentPlayer];
    player.hand = player.hand.filter((c) => c.id !== card.id);

    // Calculate score
    player.score += calculateScore(position, this.grid);

    // Draw new card if deck is not empty
    if (this.deck.length > 0) {
      const newCard = this.drawCards(1)[0];
      player.hand.push(newCard);
    }

    // Next player
    this.currentPlayer = (this.currentPlayer + 1) % this.players.length;

    return true;
  }
}

// Re-export types for convenience
export * from './types';