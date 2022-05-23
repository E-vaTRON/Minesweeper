// This is api file containing http request to manage game's data auto save
import { IUser } from "../utils/type";

const baseUrl = "https://minesweeper-data.herokuapp.com/api";

export const getAll = async () => {
  const response = await fetch(`${baseUrl}/getall`);
  const data = await response.json();
  return data;
};

export const getByUsername = async (username: string) => {
  const response = await fetch(`${baseUrl}/login/${username}`);
  const data = await response.json();
  return data[0];
};

export const updateScore = async (currentUser: IUser, newScore: number) => {
  console.log("I'm API", currentUser.id, "\n", newScore);
  let oldScore = currentUser?.highest_score ?? newScore;
  console.log("old score", oldScore);
  let score = Math.max(oldScore, newScore);
  console.log("score", score);
  const response = await fetch(
    `${baseUrl}/update/${currentUser.id}/highest_score&${score}`,
    {
      method: "POST",
      // body: JSON.stringify({ highest_score: newScore }),
    }
  );

  const data = await response.json();
  return data;
};

export const createUser = async (
  username: string /* , playerName: string */
) => {
  const response = await fetch(`${baseUrl}/create`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      username: username,
      name: username,
    }),
  });

  const data = response.json();
  return data;
};