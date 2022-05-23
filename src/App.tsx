import { MantineProvider } from "@mantine/core";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Board from "./components/Board";
import Home from "./components/Home";
import Leaderboard from "./components/Leaderboard";
import { BoardsProvider, GameInforsProvider } from "./utils/context";

function App() {
  return (
    <div className="App">
      <MantineProvider
        theme={{
          // Theme is deeply merged with default theme
          colorScheme: "light",
          fontFamily: "Roboto, sans-serif",

          headings: {
            fontFamily: "Roboto, sans-serif",
            sizes: {
              h1: { fontSize: 56 },
              h2: { fontSize: 40 },
              h3: { fontSize: 32 },
              h4: { fontSize: 24 },
            },
          },
        }}
      >
        <GameInforsProvider>
          <BoardsProvider>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/game" element={<Board />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </BoardsProvider>
        </GameInforsProvider>
      </MantineProvider>
    </div>
  );
}

export default App;
