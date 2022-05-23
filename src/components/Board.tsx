import { Button, Center, Container, Modal, Space, Text } from "@mantine/core";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateScore } from "../api";
import { computeScore } from "../utils";
import { useBoards, useGameInfors } from "../utils/context";
import {
  getFlags,
  getHidden,
  getMines,
  initBoardData,
  revealEmpty,
} from "../utils/helpers";
import Cell from "./Cell";
import Timer from "./Timer";

const Board = () => {
  let navigate = useNavigate();
  const { height, width, mines } = useBoards();
  const { currentUser, difficulty, elapsedTime, undoNumber, setUndoNumber } =
    useGameInfors();
  const [boardData, setBoardData] = React.useState<any[]>([]);
  const [stepData, setStepData] = React.useState<any[]>([]);
  const [mineCount, setMineCount] = React.useState<number>(mines);
  const [gameStatus, setGameStatus] = React.useState<
    "win" | "lost" | "in progress"
  >("in progress");
  const [modalOpened, setModalOpened] = React.useState<boolean>(false);
  const [time, setTime] = React.useState(Date.now());
  const [isLoading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    // console.log("current", currentUser);
    let initStep = initBoardData(height, width, mines);
    setBoardData(initStep);
    setStepData((prevState) => [...prevState, initStep]);
  }, []);

  // reveals the whole board
  const revealBoard = () => {
    let updatedData = [...boardData];

    updatedData.map((datarow: any) => {
      datarow.map((dataitem: any) => {
        dataitem.isRevealed = true;
      });
    });

    setBoardData(updatedData);
    setStepData((prevState) => [...prevState, updatedData]);
  };

  // Handle User Events
  const handleCellClick = (x: number, y: number) => {
    // check if revealed. return if true.
    if (boardData[x][y].isRevealed || boardData[x][y].isFlagged) return null;

    // check if mine. game over if true
    if (boardData[x][y].isMine) {
      setGameStatus("lost");
      // revealBoard();
      setModalOpened(true);
    }

    let updatedData = JSON.parse(JSON.stringify(boardData));
    updatedData[x][y].isFlagged = false;
    updatedData[x][y].isRevealed = true;

    if (updatedData[x][y].isEmpty) {
      updatedData = revealEmpty(x, y, updatedData, height, width);
    }

    if (getHidden(updatedData).length === mines) {
      setMineCount(0);
      revealBoard();
      setGameStatus("win");
      setModalOpened(true);
    }

    setBoardData(updatedData);
    setStepData((prevState) => [...prevState, updatedData]);
    setMineCount(mines - getFlags(updatedData).length);
  };

  const handleContextMenu = (e: any, x: number, y: number) => {
    e.preventDefault();
    let updatedData = JSON.parse(JSON.stringify(boardData));
    let mines = mineCount;

    // check if already revealed
    if (updatedData[x][y].isRevealed) return;

    if (updatedData[x][y].isFlagged) {
      updatedData[x][y].isFlagged = false;
      mines++;
    } else {
      updatedData[x][y].isFlagged = true;
      mines--;
    }

    if (mines === 0) {
      const mineArray = getMines(updatedData);
      const flagArray = getFlags(updatedData);
      if (JSON.stringify(mineArray) === JSON.stringify(flagArray)) {
        setMineCount(0);
        setGameStatus("win");
        revealBoard();
        setModalOpened(true);
      }
    }

    setBoardData(updatedData);
    setMineCount(mines);
  };

  const handleUndoClick = () => {
    setModalOpened(false);
    setGameStatus("in progress");
    setUndoNumber(undoNumber + 1);
    let updatedData = JSON.parse(JSON.stringify(stepData));
    updatedData.pop();
    if (updatedData.length > 1) {
      setBoardData(updatedData[updatedData.length - 1]);
      setStepData(updatedData);
    }
  };

  const handleOkClick = async () => {
    setLoading(true);
    let score = computeScore(difficulty, elapsedTime, undoNumber);
    let updateResult = await updateScore(currentUser, score);
    setLoading(false);

    navigate("/leaderboard");
  };

  const renderBoard = (data: any) => {
    return data.map((datarow: any) => {
      return datarow.map((dataitem: any) => {
        return (
          <React.Fragment key={dataitem.x * datarow.length + dataitem.y}>
            <Cell
              onClick={() => handleCellClick(dataitem.x, dataitem.y)}
              onContextMenu={(e: any) =>
                handleContextMenu(e, dataitem.x, dataitem.y)
              }
              dataItem={dataitem}
            />
            {datarow[datarow.length - 1] === dataitem ? (
              <div className="clear" />
            ) : (
              ""
            )}
          </React.Fragment>
        );
      });
    });
  };
  return (
    <div className="board">
      <div className="game-info">
        <span className="info">Mines remaining: {mineCount}</span>
        <h1 className="info">{gameStatus.toUpperCase()}</h1>
        <Timer initTime={time} isStop={gameStatus === "win"} />
        {/* <Leaderboard /> */}
        {/* <Button
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan" }}
          onClick={handleUndoClick}
        >
          Undo
        </Button> */}
        <Space />
      </div>
      <div className={`game-screen game-${height}`}>
        <div className="game-container">{renderBoard(boardData)}</div>
      </div>

      <Modal
        centered
        opened={modalOpened}
        onClose={() => {}}
        withCloseButton={false}
      >
        {gameStatus === "win" ? (
          <div>
            <Text size="xl">Congratulations!!!</Text>
            <Text>
              You won the game. Your score is{" "}
              {computeScore(difficulty, elapsedTime, undoNumber)}
            </Text>
            <Button
              size="md"
              onClick={handleOkClick}
              sx={{ float: "right" }}
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan", deg: 105 }}
            >
              Ok
            </Button>
          </div>
        ) : (
          <>
            <Text size="xl">You {gameStatus}</Text>
            <div style={{ display: "flex", justifyContent: "right" }}>
              <Button
                variant="subtle"
                onClick={handleUndoClick}
                sx={{ outline: 0 }}
              >
                Undo
              </Button>
              <Space w="md" />
              <Button
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 105 }}
                onClick={() => navigate("/")}
              >
                Restart
              </Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Board;
