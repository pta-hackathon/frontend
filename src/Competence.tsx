import React, { useState } from "react";

import Ticket from "./Ticket";
import { Icon } from "@iconify/react";

type Competence = "red" | "yellow" | "green";

export const Player = ({ name, hasSelected }: { name: string; hasSelected: boolean }) => {
  return (
    <div className="w-fit">
      <h3>{name} </h3>
      {hasSelected ? "Selected" : <Icon icon="gg-spinner" className="animate-spin text-xl" />}
    </div>
  );
};

const Competence = () => {
  const [selectedCompetence, setSelectedCompetence] = useState<Competence | undefined>(undefined);
  return (
    <div className="grid h-full grid-cols-[1fr_2fr_1fr] grid-rows-[auto_1fr_auto_1fr] items-center gap-32 p-4">
      <h1 className="col-span-3 pt-10 text-center text-6xl font-semibold">Competence</h1>
      <div></div>
      <div className="place-self-center self-end">
        <Player name="Alice" hasSelected />
      </div>
      <div></div>
      <div className="place-self-end self-center">
        <Player name="Bob" hasSelected={false} />
      </div>
      <Ticket />
      <div>
        <Player name="Charlie" hasSelected={true} />
      </div>
      <div className="col-span-3 flex justify-center gap-2 self-start">
        <div className="max-w-sm">
          <select value={selectedCompetence} onChange={(e) => setSelectedCompetence(e.target.value as Competence)}>
            <option disabled>Select your Competence</option>
            <option value="red" className="">
              Meister
            </option>
            <option className="400" value="yellow">
              Ich kenn mich aus
            </option>
            <option className="00" value="green">
              Nicht Vertraut
            </option>
          </select>
        </div>
        <button className="btn">Submit</button>
      </div>
    </div>
  );
};

export default Competence;
