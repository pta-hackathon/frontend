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
  // const stage2 = "ende" as Stage;
  const stage2 = stage;

  useEffect(() => {
    const interval = setInterval(async () => {
      const result = await client.GET("/stage");
      if (result.data?.msg) {
        setStage(result.data.msg as Stage);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid h-screen grid-rows-[auto_1fr] bg-green-600 bg-[url(/texture-3.jpg)] bg-cover">
      <div className="flex">
        <div className="flex-1 p-2">
          <button className="btn" onClick={() => client.POST("/reset")}>
            Reset
          </button>
        </div>
        <div className="flex flex-col items-center gap-4 p-4">
          <div className="h-32 w-32 rounded-full border border-pta-blue bg-transparent bg-[url(/logo.png)] bg-cover shadow-2xl"></div>
          <h1 className="text-center text-5xl font-semibold capitalize text-white">{stageNames[stage2]}</h1>
        </div>
        <div className="flex flex-1 items-start justify-end p-2">
          <Auth users={users} setUsers={setUsers} user={user} setUser={setUser} />
        </div>
      </div>
      <Poker users={users} user={user}>
        {stage2 === "warte_logon" ? (
          <Waiting />
        ) : !user ? (
          <div className="text-center text-4xl font-bold text-white">Not logged in!</div>
        ) : stage2 === "warte_kompetenz" ? (
          <Competence user={user} />
        ) : stage2 === "warte_brainstorming" ? (
          <Brainstorming user={user} users={users} />
        ) : stage2 === "ende_schaetzung" ? (
          <Estimation user={user} users={users} />
        ) : stage2 === "ende" ? (
          <Results />
        ) : null}
      </Poker>
    </div>
  );
}

export default App;
