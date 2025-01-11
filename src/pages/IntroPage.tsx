import { useState } from "react";
import { Button, NumberInput, Group, Stack, Title, Text } from "@mantine/core";
import { useNavigate } from "react-router";

const IntroPage = () => {
  const navigate = useNavigate();

  const [numEquations, setNumEquations] = useState(0);
  const [numVariables, setNumVariables] = useState(0);

  const handleStart = () => {
    navigate(`/game`, { state: { numEquations, numVariables } });
  };

  return (
    <Stack align="center" justify="center" style={{ minHeight: "100vh" }}>
      <Title order={1}>Gaussian Elimination Game</Title>
      <Text size="lg">
        This is a game of Gaussian Elimination.
      </Text>
      <Group>
        <NumberInput
          label="Number of Equations"
          value={numEquations}
          onChange={(value) => setNumEquations(Number(value))}
          min={1}
          max={10}
        />
        <NumberInput
          label="Number of Variables"
          value={numVariables}
          onChange={(value) => setNumVariables(Number(value))}
          min={1}
          max={10}
        />
      </Group>
      <Group>
        <Button size="lg" onClick={handleStart}>
          Start with {numEquations} Equations and {numVariables} Variables
        </Button>
        <Button size="lg" variant="outline">Settings</Button>
      </Group>
    </Stack>
  );
};

export default IntroPage;
