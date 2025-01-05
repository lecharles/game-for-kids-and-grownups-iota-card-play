import { Position, Card } from './types';

export function calculateScore(position: Position, grid: Map<string, Card>): number {
  let score = 1; // Base score for placing a card

  // Get horizontal and vertical lines
  const horizontalLine = getLine(position, [1, 0], grid);
  const verticalLine = getLine(position, [0, 1], grid);

  // Add points for completed lines
  if (horizontalLine.length > 0) {
    score += horizontalLine.length;
    // Double points for 4-card line
    if (horizontalLine.length === 3) score *= 2;
  }
  
  if (verticalLine.length > 0) {
    score += verticalLine.length;
    // Double points for 4-card line
    if (verticalLine.length === 3) score *= 2;
  }

  return score;
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