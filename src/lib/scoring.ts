import { Position, Card } from './types';

export function calculateScore(position: Position, grid: Map<string, Card>): number {
  let score = 0;
  const card = grid.get(`${position.x},${position.y}`);
  if (!card) return score;

  // Get horizontal and vertical lines
  const horizontalLine = getLine(position, [1, 0], grid);
  const verticalLine = getLine(position, [0, 1], grid);

  // Add points for completed lines
  if (horizontalLine.length > 0) {
    score += sumCardNumbers([card, ...horizontalLine]);
  }
  
  if (verticalLine.length > 0) {
    score += sumCardNumbers([card, ...verticalLine]);
  }

  // If no lines were formed, just add the card's number
  if (score === 0) {
    score = card.number;
  }

  return score;
}

function sumCardNumbers(cards: Card[]): number {
  return cards.reduce((sum, card) => sum + card.number, 0);
}

function getLine(position: Position, [dx, dy]: number[], grid: Map<string, Card>): Card[] {
  const line: Card[] = [];
  let x = position.x;
  let y = position.y;

  // Check in both directions
  [-1, 1].forEach(direction => {
    let currX = x;
    let currY = y;
    while (true) {
      currX += dx * direction;
      currY += dy * direction;
      const key = `${currX},${currY}`;
      if (!grid.has(key)) break;
      line.push(grid.get(key)!);
    }
  });

  return line;
}