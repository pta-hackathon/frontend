import React, { useEffect, useState } from "react";
import Waiting from "./Waiting";
import Competence from "./Competence";
import Brainstorming from "./Brainstorming";
import Auth from "./Auth";
import { Stage, User, client, stageNames } from "./api";
import Poker from "./Poker";
import Estimation from "./Estimation";
import Results from "./Results";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Josias", competence: undefined, isSignedIn: 0, isTestUser: 0 },
    { id: 2, name: "Kyrellos", competence: undefined, isSignedIn: 0, isTestUser: 1 },
    { id: 3, name: "Thomas", competence: undefined, isSignedIn: 1, isTestUser: 1 },
    { id: 4, name: "Waldemar", competence: undefined, isSignedIn: 0, isTestUser: 1 },
  ]);
  const [stage, setStage] = useState<Stage>("warte_logon");
  const stage2 = "warte_estimation" as Stage;

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
          <Auth users={users} setUsers={setUsers} user={user} setUser={setUser} />
        </div>
      </div>
      <Poker users={users} user={user}>
        {stage2 === "warte_logon" ? (
          <Waiting />
        ) : stage2 === "warte_kompetenz" ? (
          <Competence />
        ) : stage2 === "warte_brainstorming" ? (
          <Brainstorming />
        ) : stage2 === "warte_estimation" ? (
          <Estimation users={users} />
        ) : stage2 === "ende" ? (
          <Results />
        ) : null}
      </Poker>
    </div>
  );
}

export default App;
