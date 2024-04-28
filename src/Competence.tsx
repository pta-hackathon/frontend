import React, { useState } from "react";

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
    <div className="col-span-3 flex items-center justify-center gap-2">
      <div className="max-w-sm">
        <select
          value={selectedCompetence}
          onChange={(e) => setSelectedCompetence(e.target.value as Competence)}
          className="select"
        >
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
  );
};

export default Competence;
