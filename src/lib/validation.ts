import { Card, Position } from './types';

export function isValidLine(cards: Card[]): boolean {
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

export function isValidMove(position: Position, card: Card, grid: Map<string, Card>): boolean {
  const key = `${position.x},${position.y}`;
  if (grid.has(key)) return false;

  // If it's the first card, it must be placed at (4,4)
  if (grid.size === 0) {
    return position.x === 4 && position.y === 4;
  }

  // Check if there are adjacent cards
  const hasAdjacent = getAdjacentCards(position, grid).length > 0;
  if (!hasAdjacent) return false;

  // Check if the placement creates valid lines
  return isValidPlacement(position, card, grid);
}

function getAdjacentCards(position: Position, grid: Map<string, Card>): Card[] {
  const adjacent: Card[] = [];
  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

  directions.forEach(([dx, dy]) => {
    const key = `${position.x + dx},${position.y + dy}`;
    if (grid.has(key)) {
      adjacent.push(grid.get(key)!);
    }
  });

  return adjacent;
}

function isValidPlacement(position: Position, card: Card, grid: Map<string, Card>): boolean {
  // Check horizontal line
  const horizontalLine = getLine(position, [1, 0], grid);
  if (horizontalLine.length > 0 && !isValidLine([...horizontalLine, card])) {
    return false;
  }

  // Check vertical line
  const verticalLine = getLine(position, [0, 1], grid);
  if (verticalLine.length > 0 && !isValidLine([...verticalLine, card])) {
    return false;
  }

  return true;
}

function getLine(position: Position, [dx, dy]: number[], grid: Map<string, Card>): Card[] {
  const line: Card[] = [];
  let x = position.x;
  let y = position.y;

  // Check in positive direction
  while (true) {
    x += dx;
    y += dy;
    const key = `${x},${y}`;
    if (!grid.has(key)) break;
    line.push(grid.get(key)!);
  }

  // Reset position
  x = position.x;
  y = position.y;

  // Check in negative direction
  while (true) {
    x -= dx;
    y -= dy;
    const key = `${x},${y}`;
    if (!grid.has(key)) break;
    line.push(grid.get(key)!);
  }

  return line;
}