import { Grid } from "@mantine/core";
import React from "react";

type dataItemType = {
  isRevealed: boolean;
  isFlagged: boolean;
  isMine: boolean;
  neighbour: number;
  x: number;
  y: number;
};

type CellProps = {
  dataItem: dataItemType;
  onClick: () => void;
  onContextMenu: (e: any) => void;
};

const Cell = ({ dataItem, onClick, onContextMenu }: CellProps) => {
  let className =
    "cell" +
    (dataItem.isRevealed ? "" : " hidden") +
    (dataItem.isMine ? " is-mine" : "") +
    (dataItem.isFlagged ? " is-flag" : "");

  const getValue = () => {
    if (!dataItem.isRevealed) {
      return dataItem.isFlagged ? "🚩" : null;
    }
    if (dataItem.isMine) {
      return "💣";
    }
    if (dataItem.neighbour === 0) {
      return null;
    }
    return dataItem.neighbour;
  };

  return (
    <div onClick={onClick} className={className} onContextMenu={onContextMenu}>
      {getValue()}
    </div>
  );
};

export default Cell;
