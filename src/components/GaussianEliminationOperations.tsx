import React, { useEffect, useState } from "react";
import {
  Button,
  Group,
  NumberInput,
  Select,
  Text,
  Transition,
  rem,
} from "@mantine/core";

const rowOperations = ["Swap", "Multiply", "Add", "Divide"];

interface GaussianEliminationOperationsProps {
  matrix: number[][];
  setMatrix: React.Dispatch<React.SetStateAction<number[][]>>;
}

const GaussianEliminationOperations: React.FC<GaussianEliminationOperationsProps> = ({
  matrix,
  setMatrix,
}) => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedOperation, setSelectedOperation] = useState<string | null>(null);
  const [multiplier, setMultiplier] = useState<number | null>(null);
  const [divisor, setDivisor] = useState<number | null>(null);
  const [targetRow, setTargetRow] = useState<number | null>(null);

  const [operationText, setOperationText] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Helper function to clone matrix
  const cloneMatrix = () => matrix.map((row) => [...row]);

  const swapRows = () => {
    if (selectedRow !== null && targetRow !== null && selectedRow !== targetRow) {
      const newMatrix = cloneMatrix();
      const temp = newMatrix[selectedRow];
      newMatrix[selectedRow] = newMatrix[targetRow];
      newMatrix[targetRow] = temp;
      setMatrix(newMatrix);
    }
  };

  const multiplyRow = () => {
    if (selectedRow !== null && multiplier !== null) {
      const newMatrix = cloneMatrix();
      newMatrix[selectedRow] = newMatrix[selectedRow].map((val) => val * multiplier);
      setMatrix(newMatrix);
    }
  };

  const divideRow = () => {
    if (selectedRow !== null && divisor !== null && divisor !== 0) {
      const newMatrix = cloneMatrix();
      newMatrix[selectedRow] = newMatrix[selectedRow].map((val) => val / divisor);
      setMatrix(newMatrix);
    }
  };

  const addRow = () => {
    if (
      selectedRow !== null &&
      targetRow !== null &&
      multiplier !== null &&
      selectedRow !== targetRow
    ) {
      const newMatrix = cloneMatrix();
      newMatrix[targetRow] = newMatrix[targetRow].map(
        (value, index) => value + newMatrix[selectedRow][index] * multiplier
      );
      setMatrix(newMatrix);
    }
  };

  // Update operation text
  useEffect(() => {
    if (selectedOperation === "Swap" && selectedRow !== null && targetRow !== null) {
      setOperationText(`Row ${selectedRow + 1} ⇆ Row ${targetRow + 1}`);
    } else if (selectedOperation === "Multiply" && selectedRow !== null && multiplier !== null) {
      setOperationText(`Row ${selectedRow + 1} = ${multiplier} × Row ${selectedRow + 1}`);
    } else if (
      selectedOperation === "Add" &&
      selectedRow !== null &&
      targetRow !== null &&
      multiplier !== null
    ) {
      setOperationText(
        `Row ${targetRow + 1} = Row ${targetRow + 1} + ${multiplier} × Row ${selectedRow + 1}`
      );
    } else if (selectedOperation === "Divide" && selectedRow !== null && divisor !== null) {
      setOperationText(`Row ${selectedRow + 1} = Row ${selectedRow + 1} ÷ ${divisor}`);
    } else {
      setOperationText("");
    }
  }, [selectedOperation, selectedRow, targetRow, multiplier, divisor]);

  // Apply the selected operation
  const handleApply = () => {
    if (
      (selectedOperation === "Multiply" && multiplier === 0) ||
      (selectedOperation === "Divide" && divisor === 0)
    ) {
      return; // Do nothing if multiplier or divisor is zero
    }

    switch (selectedOperation) {
      case "Swap":
        swapRows();
        break;
      case "Multiply":
        multiplyRow();
        break;
      case "Add":
        addRow();
        break;
      case "Divide":
        divideRow();
        break;
      default:
        return;
    }

    // Success animation
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 1000);
  };

  return (
    <Group
      align="flex-start"
      style={{
        marginTop: "2rem",
        padding: "1rem",
        borderRadius: "8px",
        backgroundColor: "rgba(219, 235, 255, 0.2)",
        flexWrap: "wrap",
      }}
    >
      <Select
        data={matrix.map((_, index) => ({
          label: `Row ${index + 1}`,
          value: index.toString(),
        }))}
        placeholder="Select row"
        value={selectedRow !== null ? selectedRow.toString() : null}
        onChange={(value) => {
          if (value !== null) setSelectedRow(parseInt(value, 10));
          else setSelectedRow(null);
        }}
        style={{ minWidth: rem(120) }}
      />

      <Select
        data={rowOperations}
        placeholder="Operation"
        value={selectedOperation}
        onChange={(value) => setSelectedOperation(value)}
        style={{ minWidth: rem(120) }}
      />

      {selectedOperation !== "Swap" && selectedOperation !== "Divide" && selectedRow !== null && (
        <NumberInput
          placeholder="Multiplier"
          value={multiplier === null ? undefined : multiplier}
          onChange={(val) => setMultiplier(Number(val) ?? null)}
          style={{ width: rem(100) }}
        />
      )}

      {(selectedOperation === "Swap" || selectedOperation === "Add") && selectedRow !== null && (
        <Select
          data={matrix.map((_, index) => ({
            label: `Row ${index + 1}`,
            value: index.toString(),
          }))}
          placeholder="Target row"
          value={targetRow !== null ? targetRow.toString() : null}
          onChange={(value) => {
            if (value !== null) setTargetRow(parseInt(value, 10));
            else setTargetRow(null);
          }}
          style={{ minWidth: rem(120) }}
        />
      )}

      {selectedOperation === "Divide" && selectedRow !== null && (
        <NumberInput
          placeholder="Divisor"
          value={divisor === null ? undefined : divisor}
          onChange={(val) => setDivisor(Number(val) ?? null)}
          style={{ width: rem(100) }}
        />
      )}

      <Button
        onClick={handleApply}
        disabled={
          !selectedOperation ||
          (selectedOperation === "Multiply" && multiplier === 0) ||
          (selectedOperation === "Divide" && divisor === 0)
        }
        style={(theme) => ({
          backgroundColor: theme.colors.blue[5],
          color: theme.white,
          "&:hover": {
            backgroundColor: theme.colors.blue[6],
            transform: "scale(1.03)",
            transition: "transform 0.1s ease-in-out",
          },
        })}
      >
        Apply
      </Button>

      <Group>
        <Text
          style={(theme) => ({
            marginLeft: theme.spacing.md,
            fontWeight: 600,
            color: theme.colors.blue[7],
          })}
        >
          {operationText}
        </Text>
        <Transition mounted={showSuccess} transition="slide-down" duration={300} timingFunction="ease">
          {(styles) => <Text style={styles}>✔️</Text>}
        </Transition>
      </Group>
    </Group>
  );
};

export default GaussianEliminationOperations;
