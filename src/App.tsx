import React from "react";
import Waiting from "./Waiting";
import Competence from "./Competence";
import Brainstorming from "./Brainstorming";
import Auth from "./Auth";

type Stage = "waiting" | "competence" | "brainstorming" | "estimation" | "results";

function App() {
  const stage = "waiting" as Stage;

  return (
    <div className="grid h-screen grid-rows-[auto_1fr] bg-green-600 text-white">
      <div className="flex">
        <span className="flex-1"></span>
        <h1 className="pt-16 text-center text-5xl font-semibold capitalize">{stage}</h1>
        <div className="flex flex-1 items-start justify-end p-2">
          <Auth />
        </div>
      </div>
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
