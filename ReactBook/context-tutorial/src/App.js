import logo from "./logo.svg";
import "./App.css";
import React from "react";
import ColorBox from "./components/ColorBox";
import ColorContext, { ColorProvider } from "./contexts/color";
import SelectColors from "./components/SelectColor";

function App() {
  return (
    <ColorProvider>
      <div>
        <SelectColors />
        <ColorBox />
      </div>
    </ColorProvider>
  );
}

export default App;
