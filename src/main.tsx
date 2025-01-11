import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import IntroPage from "./pages/IntroPage.tsx";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import GamePage from "./pages/GamePage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider
      theme={{
        fontFamily: 'Poppins, sans-serif',
        colors: {
          primary: ['#dff6ff', '#aee4ff', '#7cd2ff', '#4ac0ff', '#1aaffe', '#0096e4', '#0074b1', '#00527f', '#00324f', '#00121f'],
        },
        primaryColor: 'primary',
        defaultRadius: 'md',
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>
);
