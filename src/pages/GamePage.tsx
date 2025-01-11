import { Title } from "@mantine/core";
import { useLocation } from "react-router";
import Matrix from "../components/Matrix";
import { useState, useEffect } from "react";
import GaussianEliminationOperations from "../components/GaussianEliminationOperations";

const GamePage = () => {
  const location = useLocation();
  const { numEquations, numVariables } = location.state;

  const [matrix, setMatrix] = useState<number[][]>([]);

  useEffect(() => {
    setMatrix(
      Array.from({ length: numEquations }, () =>
        Array.from({ length: numVariables + 1 }, () => Math.floor(Math.random() * 21) - 10)
      )
    );
  }, [numEquations, numVariables]);

  return (
    <div style={{ textAlign: "center", padding: "1rem" }}>
      <Title
        style={{
          fontFamily: "Poppins, sans-serif",
          marginBottom: "1rem",
        }}
      >
        Gaussian Elimination Puzzle Game
      </Title>
      <Matrix matrix={matrix} />
      <GaussianEliminationOperations matrix={matrix} setMatrix={setMatrix} />
    </div>
  );
};

export default GamePage;
