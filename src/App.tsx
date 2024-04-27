import React from "react";
import Waiting from "./Waiting";
import Competence from "./Competence";
import Brainstorming from "./Brainstorming";

type Stage = "waiting" | "competence" | "brainstorming" | "estimation" | "results";

function App() {
  const stage = "brainstorming" as Stage;

  return (
    <div className="grid h-screen grid-rows-[auto_1fr] bg-green-600">
      <h1 className="pt-16 text-center text-5xl font-semibold capitalize text-white">{stage}</h1>
      {stage === "waiting" ? (
        <Waiting />
      ) : stage === "competence" ? (
        <Competence />
      ) : stage === "brainstorming" ? (
        <Brainstorming />
      ) : stage === "estimation" ? (
        <div>Estimation</div>
      ) : stage === "results" ? (
        <div>Results</div>
      ) : null}
    </div>
  );
}

export default App;
