import { Button, Table, Title } from "@mantine/core";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAll } from "../api";
import LoadingOverlay from "./LoadingOverlay";

const Leaderboard = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState<any[]>([]);
  const [isLoading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const result = await getAll();
      setData(result);
      setLoading(false);
    };

    getData();
  }, []);

  const header = (
    <tr>
      <th>Top</th>
      <th>Player</th>
      <th>Score</th>
    </tr>
  );

  const sortDataByScore = (data: any[]) => {
    return data.sort((a, b) => b.highest_score * 1 - a.highest_score * 1);
  };

  // useEffect(() => {
  //   console.log(sortDataByScore(data));
  // }, [data]);

  const rows = sortDataByScore(data).map((element, index: number) => (
    <React.Fragment key={index * Math.random()}>
      {index < 10 && element.highest_score > 0 && (
        <tr className={"top-" + (index + 1)}>
          <td>{index + 1}</td>
          <td>{element.username}</td>
          <td>{element.highest_score}</td>
        </tr>
      )}
    </React.Fragment>
  ));

  return (
    <div className="leaderboard">
      {isLoading && <LoadingOverlay />}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title>Leaderboard</Title>
        <Button
          size="md"
          onClick={() => navigate("/")}
          sx={{ float: "right" }}
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan", deg: 105 }}
        >
          Start
        </Button>
      </div>
      <Table highlightOnHover verticalSpacing="sm">
        <thead>{header}</thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
};

export default Leaderboard;