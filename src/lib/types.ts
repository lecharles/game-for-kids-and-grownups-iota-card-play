export type CardColor = 'red' | 'blue' | 'green' | 'yellow';
export type CardShape = 'square' | 'triangle' | 'circle' | 'cross';
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