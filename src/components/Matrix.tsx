import React from "react";
import { Table, Box } from "@mantine/core";

interface MatrixProps {
  matrix: number[][];
  selectedRow?: number | null; // optional if you want to highlight a selected row
}

const Matrix: React.FC<MatrixProps> = ({ matrix, selectedRow }) => {
  return (
    <Box
      style={{
        borderRadius: "8px",
        maxWidth: "600px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        margin: "1rem auto",
        overflow: "hidden",
        backgroundColor: "rgba(219, 235, 255, 0.1)",
      }}
    >
      <Table
        highlightOnHover
        withColumnBorders
        withRowBorders
        style={{
          borderCollapse: "separate",
          borderSpacing: 0,
          width: "100%",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <tbody>
          {matrix.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              style={{
                backgroundColor:
                  selectedRow === rowIndex ? "rgba(255, 200, 0, 0.2)" : undefined,
              }}
            >
              {row.map((value, colIndex) => (
                <td
                  key={colIndex}
                  style={{
                    textAlign: "center",
                    padding: "12px",
                    minWidth: "50px",
                    border: "1px solid #e0e0e0",
                    transition: "background-color 0.1s, transform 0.1s",
                  }}
                  // Hover effect
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLTableCellElement).style.backgroundColor =
                      "rgba(173, 216, 230, 0.4)"; // Light playful color on hover
                    (e.currentTarget as HTMLTableCellElement).style.transform = "scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLTableCellElement).style.backgroundColor = "";
                    (e.currentTarget as HTMLTableCellElement).style.transform = "";
                  }}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default Matrix;
