export type CardColor = 'red' | 'blue' | 'green' | 'orange';
export type CardShape = 'square' | 'triangle' | 'circle' | 'plus';
export type CardNumber = 1 | 2 | 3 | 4;

export interface Card {
  id: string;
  color: CardColor;
  shape: CardShape;
  number: CardNumber;
}

export interface Player {
  id: number;
  name: string;
  hand: Card[];
  score: number;
}

export interface Position {
  x: number;
  y: number;
}

export class ChromalinkGame {
  private deck: Card[] = [];
  public players: Player[] = [];
  public currentPlayer = 0;
  public grid: Map<string, Card> = new Map();

  constructor(numPlayers: number) {
    this.initializeDeck();
    this.initializePlayers(numPlayers);
  }

  private initializeDeck() {
    const colors: CardColor[] = ['red', 'blue', 'green', 'orange'];
    const shapes: CardShape[] = ['square', 'triangle', 'circle', 'plus'];
    const numbers: CardNumber[] = [1, 2, 3, 4];

    colors.forEach((color) => {
      shapes.forEach((shape) => {
        numbers.forEach((number) => {
          this.deck.push({
            id: `${color}-${shape}-${number}`,
            color,
            shape,
            number,
          });
        });
      });
    });

    this.shuffleDeck();
  }

  private shuffleDeck() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
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

  public isValidMove(position: Position, card: Card): boolean {
    // Basic validation for now
    const key = `${position.x},${position.y}`;
    return !this.grid.has(key);
  }

  public placeCard(position: Position, card: Card): boolean {
    if (!this.isValidMove(position, card)) {
      return false;
    }

    const key = `${position.x},${position.y}`;
    this.grid.set(key, card);
    
    // Remove card from player's hand
    const player = this.players[this.currentPlayer];
    player.hand = player.hand.filter((c) => c.id !== card.id);
    
    // Draw new card
    const newCard = this.drawCards(1)[0];
    if (newCard) {
      player.hand.push(newCard);
    }

    // Update score (simplified for now)
    player.score += 1;

    // Next player
    this.currentPlayer = (this.currentPlayer + 1) % this.players.length;

    return true;
  }
}