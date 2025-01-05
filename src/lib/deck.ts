import { Card, CardColor, CardShape, CardNumber } from './types';

export function createDeck(): Card[] {
  const deck: Card[] = [];
  const colors: CardColor[] = ['red', 'blue', 'green', 'yellow'];
  const shapes: CardShape[] = ['square', 'triangle', 'circle', 'cross'];
  const numbers: CardNumber[] = [1, 2, 3, 4];

  // Create 66 cards (including duplicates of some combinations)
  colors.forEach((color) => {
    shapes.forEach((shape) => {
      numbers.forEach((number) => {
        deck.push({
          id: `${color}-${shape}-${number}`,
          color,
          shape,
          number,
        });
      });
    });
  });

  // Add two extra cards to make it 66 total
  deck.push({
    id: `red-square-1-extra`,
    color: 'red',
    shape: 'square',
    number: 1,
  });
  deck.push({
    id: `blue-circle-2-extra`,
    color: 'blue',
    shape: 'circle',
    number: 2,
  });

  return deck;
}

export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}