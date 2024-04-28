import React, { useEffect, useState } from "react";
import Waiting from "./Waiting";
import Competence from "./Competence";
import Brainstorming from "./Brainstorming";
import Auth from "./Auth";
import { Stage, client, stageNames } from "./api";

function App() {
  const [stage, setStage] = useState<Stage>("warte_logon");
  const stage2: Stage = "warte_brainstorming";

  useEffect(() => {
    const interval = setInterval(async () => {
      const result = await client.GET("/stage");
      if (result.data?.msg) {
        setStage(result.data.msg as Stage);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  client.GET("/stage");

  return (
    <div className="grid h-screen grid-rows-[auto_1fr] bg-green-600">
      <div className="flex">
        <span className="flex-1 text-white">Server stage: {stage}</span>
        <h1 className="pt-16 text-center text-5xl font-semibold capitalize text-white">{stageNames[stage2]}</h1>
        <div className="flex flex-1 items-start justify-end p-2">
          <Auth />
        </div>
      </div>
      {stage2 === "warte_logon" ? (
        <Waiting />
      ) : stage2 === "warte_kompetenz" ? (
        <Competence />
      ) : stage2 === "warte_brainstorming" ? (
        <Brainstorming />
      ) : stage2 === "" ? (
        <div>Estimation</div>
      ) : stage2 === "ende" ? (
        <div>Results</div>
      ) : null}
    </div>
  );
}

export default App;
