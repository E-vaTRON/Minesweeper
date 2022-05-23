import { tuple } from ".";

export interface IUser {
  id: string;
  username: string;
  name?: string;
  highest_score: number;
}

export interface IBoard {
  height: number;
  width: number;
  mines: number;
}

export interface ICell {
  x: number;
  y: number;
  neighbour: number;
  isMine: boolean;
  isRevealed: boolean;
  isEmpty: boolean;
  isFlagged: boolean;
}

const Difficulties = tuple("easy", "medium", "hard");
export type DifficultyType = typeof Difficulties[number];