import {
  Text,
  Container,
  Title,
  Stack,
  TextInput,
  Button,
  Modal,
  Loader,
  Space,
  Center,
} from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { createUser, getByUsername, updateScore } from "../api";
import { checkUsernameExist } from "../utils";
import { useBoards, useGameInfors } from "../utils/context";
import { DifficultyType, IUser } from "../utils/type";
import LoadingOverlay from "./LoadingOverlay";

const Home = () => {
  let navigate = useNavigate();
  let { currentUser, setDifficulty, setCurrentUser } = useGameInfors();
  const { setHeight, setMines, setWidth } = useBoards();
  const [username, setUsername] = React.useState("");
  const [modalOpened, setModalOpened] = React.useState<boolean>(false);
  const [isLoading, setLoading] = React.useState<boolean>(false);

  const handleLetsGoClick = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    let checkUsernameResult = await checkUsernameExist(username);
    // console.log(checkUsernameResult);

    if (!checkUsernameResult) {
      let result = await createUser(username);
      // console.log("clgt", result);
    }

    setLoading(false);
    setModalOpened(true);
  };

  const handleDifficultyClick = async (difficulty: DifficultyType) => {
    setLoading(true);
    let user = await getByUsername(username);
    // console.log(user);
    setCurrentUser(user);

    setDifficulty(difficulty);

    switch (difficulty) {
      case "easy":
        setHeight(8);
        setWidth(8);
        setMines(10);
        break;
      case "medium":
        setHeight(16);
        setWidth(16);
        setMines(40);
        break;
      default:
        setHeight(24);
        setWidth(24);
        setMines(99);
    }

    setLoading(false);
    navigate("/game");
  };

  return (
    <div className="home">
      {isLoading && <LoadingOverlay />}
      <Container>
        <Stack sx={{ textAlign: "center" }}>
          <Title order={1}>Minesweeper</Title>
          <Text size="xl">No Sweep, No Invasion</Text>
          <form>
            <TextInput
              placeholder="Your username"
              size="md"
              required
              sx={{ width: 500, margin: "auto" }}
              value={username}
              onChange={(event) => setUsername(event.currentTarget.value)}
            />
            <Space h="xl" />
            <Button
              size="lg"
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan" }}
              sx={{ width: 200, margin: "auto" }}
              onClick={(e: any) => handleLetsGoClick(e)}
              type="submit"
            >
              Get go
            </Button>
          </form>
        </Stack>
      </Container>

      <Modal
        centered
        opened={modalOpened}
        closeButtonLabel="Back"
        onClose={() => setModalOpened(false)}
        title="Select difficulty"
      >
        <Center>
          <Stack>
            <Button
              size="md"
              variant="gradient"
              gradient={{ from: "teal", to: "lime", deg: 105 }}
              onClick={() => handleDifficultyClick("easy")}
            >
              Easy
            </Button>
            <Button
              size="md"
              variant="gradient"
              gradient={{ from: "orange", to: "red", deg: 105 }}
              onClick={() => handleDifficultyClick("medium")}
            >
              Medium
            </Button>
            <Button
              size="md"
              variant="gradient"
              gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 105 }}
              onClick={() => handleDifficultyClick("hard")}
            >
              Hard
            </Button>
          </Stack>
        </Center>
      </Modal>
    </div>
  );
};

export default Home;
