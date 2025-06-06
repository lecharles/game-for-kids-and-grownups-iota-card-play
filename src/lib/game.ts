import { Card, Player, Position } from './types';
import { createDeck, shuffleDeck } from './deck';
import { isValidMove } from './validation';
import { calculateScore } from './scoring';

export class ChromalinkGame {
  public deck: Card[] = [];
  public players: Player[] = [];
  public currentPlayer = 0;
  public grid: Map<string, Card> = new Map();

  constructor(numPlayers: number, playerNames: string[]) {
    console.log('Initializing game with', numPlayers, 'players');
    this.initializeDeck();
    this.initializePlayers(numPlayers, playerNames);
    this.placeInitialCard();
  }

  private initializeDeck() {
    this.deck = shuffleDeck(createDeck());
  }

  private initializePlayers(numPlayers: number, playerNames: string[]) {
    // Ensure number of players is valid
    if (numPlayers < 2 || numPlayers > 4) {
      throw new Error('Invalid number of players');
    }

    // Clear existing players
    this.players = [];

    // Create new players with initial hands
    for (let i = 0; i < numPlayers; i++) {
      const hand = this.drawCards(4);
      console.log(`Initializing Player ${i + 1} with hand:`, hand);
      this.players.push({
        id: i,
        name: playerNames[i] || `Player ${i + 1}`,
        hand,
        score: 0,
      });
    }
  }

  private placeInitialCard() {
    // Draw a card for the center
    const centerCard = this.drawCards(1)[0];
    console.log('Placing initial card in center:', centerCard);
    
    // Place it at position (4,4) - center of the 8x8 grid
    this.grid.set('4,4', centerCard);
  }

  private drawCards(count: number): Card[] {
    return this.deck.splice(0, count);
  }

  public swapCards(cardIds: string[]): boolean {
    if (cardIds.length !== 2 || this.deck.length < 2) return false;

    const player = this.players[this.currentPlayer];
    const cardsToSwap = player.hand.filter(card => cardIds.includes(card.id));
    
    if (cardsToSwap.length !== 2) return false;

    // Remove cards from player's hand
    player.hand = player.hand.filter(card => !cardIds.includes(card.id));
    
    // Add cards back to deck and shuffle
    this.deck.push(...cardsToSwap);
    this.deck = shuffleDeck(this.deck);
    
    // Draw new cards
    const newCards = this.drawCards(2);
    player.hand.push(...newCards);

    console.log('Swapped cards for player', player.name, 'New hand:', player.hand);
    return true;
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