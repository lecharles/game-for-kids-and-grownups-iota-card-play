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
  public deck: Card[] = [];
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
    const key = `${position.x},${position.y}`;
    if (this.grid.has(key)) return false;

    // If it's the first card, it must be placed at (4,4)
    if (this.grid.size === 0) {
      return position.x === 4 && position.y === 4;
    }

    // Check if there are adjacent cards
    const hasAdjacent = this.getAdjacentCards(position).length > 0;
    if (!hasAdjacent) return false;

    // Check if the placement creates valid lines
    return this.isValidPlacement(position, card);
  }

  private getAdjacentCards(position: Position): Card[] {
    const adjacent: Card[] = [];
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    directions.forEach(([dx, dy]) => {
      const key = `${position.x + dx},${position.y + dy}`;
      if (this.grid.has(key)) {
        adjacent.push(this.grid.get(key)!);
      }
    });

    return adjacent;
  }

  private isValidPlacement(position: Position, card: Card): boolean {
    // Check horizontal line
    const horizontalLine = this.getLine(position, [1, 0]);
    if (horizontalLine.length > 0 && !this.isValidLine([...horizontalLine, card])) {
      return false;
    }

    // Check vertical line
    const verticalLine = this.getLine(position, [0, 1]);
    if (verticalLine.length > 0 && !this.isValidLine([...verticalLine, card])) {
      return false;
    }

    return true;
  }

  private getLine(position: Position, [dx, dy]: number[]): Card[] {
    const line: Card[] = [];
    let x = position.x;
    let y = position.y;

    // Check in positive direction
    while (true) {
      x += dx;
      y += dy;
      const key = `${x},${y}`;
      if (!this.grid.has(key)) break;
      line.push(this.grid.get(key)!);
    }

    // Reset position
    x = position.x;
    y = position.y;

    // Check in negative direction
    while (true) {
      x -= dx;
      y -= dy;
      const key = `${x},${y}`;
      if (!this.grid.has(key)) break;
      line.push(this.grid.get(key)!);
    }

    return line;
  }

  private isValidLine(cards: Card[]): boolean {
    if (cards.length <= 1) return true;

    // Check if all colors are same or all different
    const colors = new Set(cards.map(c => c.color));
    if (colors.size !== 1 && colors.size !== cards.length) return false;

    // Check if all shapes are same or all different
    const shapes = new Set(cards.map(c => c.shape));
    if (shapes.size !== 1 && shapes.size !== cards.length) return false;

    // Check if all numbers are same or all different
    const numbers = new Set(cards.map(c => c.number));
    if (numbers.size !== 1 && numbers.size !== cards.length) return false;

    return true;
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

    // Calculate score
    player.score += this.calculateScore(position);

    // Draw new card if deck is not empty
    if (this.deck.length > 0) {
      const newCard = this.drawCards(1)[0];
      player.hand.push(newCard);
    }

    // Next player
    this.currentPlayer = (this.currentPlayer + 1) % this.players.length;

    return true;
  }

  private calculateScore(position: Position): number {
    let score = 1; // Base score for placing a card

    // Add points for completed lines
    const horizontalLine = this.getLine(position, [1, 0]);
    const verticalLine = this.getLine(position, [0, 1]);

    if (horizontalLine.length > 0) score += horizontalLine.length;
    if (verticalLine.length > 0) score += verticalLine.length;

    return score;
  }
}