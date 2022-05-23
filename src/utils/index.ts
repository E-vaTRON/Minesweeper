import { getAll } from "../api";
import { useGameInfors } from "./context";
import { DifficultyType } from "./type";

export const formatTime = (time: any) => {
  var ms = time % 1000;
  time = (time - ms) / 1000;
  var secs = time % 60;
  time = (time - secs) / 60;
  var mins = time % 60;
  var hrs = (time - mins) / 60;

  if (hrs > 0) return "0:00";

  if (secs < 10) return `${mins}:0${secs}`;

  return `${mins}:${secs}`;
};

export const checkUsernameExist = async (username: string) => {
  username = username.trim();
  const userList = await getAll();
  return userList.some((item: any) => item.username === username);
};

export const computeScore = (
  difficulty: DifficultyType,
  timeSpent: number,
  undoCount: number
) => {
  let score = 0;

  console.log("game infor", difficulty, "\n", timeSpent, "\n", undoCount);

  // Convert time from ms to seconds
  var ms = timeSpent % 1000;
  timeSpent = (timeSpent - ms) / 1000;
  var secs = timeSpent % 60;

  // console.log("time", secs);

  let levelMaxTime = 300; // The player has to completed the level within 300 seconds
  let levelScore = 1; // The player will be awarded of 1 points per remaining second

  switch (difficulty) {
    case "easy":
      score = 100;
      break;
    case "medium":
      score = 200;
      levelScore = 2;
      levelMaxTime = 480;
      break;
    default:
      score = 400;
      levelScore = 4;
      levelMaxTime = 600;
  }

  // console.log("AFTER Switch", score);

  // Compute the final score
  score = Math.max(
    0,
    score + Math.max(0, levelMaxTime - secs) * levelScore - undoCount * 200
  );

  // console.log("FInal score", score);

  return score;
};

export const tuple = <T extends string[]>(...args: T) => args;
export const tupleNum = <T extends number[]>(...args: T) => args;
