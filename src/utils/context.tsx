import React, { useContext } from "react";
import { DifficultyType, IBoard, IUser } from "./type";

interface IBoardContext extends IBoard {
  setHeight: (height: number) => void;
  setWidth: (width: number) => void;
  setMines: (mines: number) => void;
}

const defaultState: IBoardContext = {
  height: 8,
  width: 8,
  mines: 10,
  setHeight: () => {},
  setWidth: () => {},
  setMines: () => {},
};

export const BoardsContext = React.createContext<IBoardContext>(defaultState);

export function BoardsProvider({ children }: any) {
  const [height, setHeight] = React.useState(8);
  const [width, setWidth] = React.useState(8);
  const [mines, setMines] = React.useState(10);
  return (
    <BoardsContext.Provider
      value={{ height, width, mines, setHeight, setWidth, setMines }}
    >
      {children}
    </BoardsContext.Provider>
  );
}

export const useBoards = () => useContext(BoardsContext);

interface IGameInforContext {
  // username: string;
  // setUsername: (username: string) => void;
  currentUser: IUser;
  setCurrentUser: (currentUser: IUser) => void;
  difficulty: DifficultyType;
  setDifficulty: (difficulty: DifficultyType) => void;
  elapsedTime: number;
  setElapsedTime: (elapsedTime: number) => void;
  undoNumber: number;
  setUndoNumber: (undoNumber: number) => void;
}

const defaultGameInfor: IGameInforContext = {
  currentUser: {} as IUser,
  difficulty: "easy",
  elapsedTime: 0,
  undoNumber: 0,
  setDifficulty: () => {},
  setElapsedTime: () => {},
  setUndoNumber: () => {},
  setCurrentUser: () => {},
};

export const GameInforsContext =
  React.createContext<IGameInforContext>(defaultGameInfor);

export function GameInforsProvider({ children }: any) {
  const [currentUser, setCurrentUser] = React.useState<IUser>(
    defaultGameInfor.currentUser
  );

  const [difficulty, setDifficulty] = React.useState<DifficultyType>(
    defaultGameInfor.difficulty
  );

  const [elapsedTime, setElapsedTime] = React.useState<number>(
    defaultGameInfor.elapsedTime
  );

  const [undoNumber, setUndoNumber] = React.useState<number>(
    defaultGameInfor.undoNumber
  );

  return (
    <GameInforsContext.Provider
      value={{
        currentUser,
        difficulty,
        elapsedTime,
        undoNumber,
        setCurrentUser,
        setDifficulty,
        setElapsedTime,
        setUndoNumber,
      }}
    >
      {children}
    </GameInforsContext.Provider>
  );
}

export const useGameInfors = () => useContext(GameInforsContext);
