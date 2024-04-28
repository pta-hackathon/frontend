import React, { useState } from "react";
import { User, client, competenceNames, type Competence as CompetenceType } from "./api";

const Competence = ({ user }: { user: User | null }) => {
  const [selectedCompetence, setSelectedCompetence] = useState<CompetenceType | "">("");

  const sendCompetence = async () => {
    console.log(selectedCompetence, user?.name);
    if (!selectedCompetence || !user?.name) return;
    await client.POST("/kompetenz", { params: { query: { user: user.name, kompetenz: selectedCompetence } } });
  };

  return (
    <div className="flex flex-col gap-4">
      {user?.competence && (
        <div className="text-center text-white">
          Your selected competence is:
          <span className="font-bold"> {competenceNames[user.competence as CompetenceType]} </span>
        </div>
      )}
      {user?.competence}
      <div className="flex items-center justify-center gap-2">
        <div className="max-w-sm">
          <select
            value={selectedCompetence}
            onChange={(e) => setSelectedCompetence(e.target.value as CompetenceType)}
            className="select"
          >
            <option value="" disabled>
              Select your Competence
            </option>
            {(["rot", "gelb", "gruen"] as CompetenceType[]).map((c) => (
              <option key={c} value={c} className="">
                {competenceNames[c]}
              </option>
            ))}
          </select>
        </div>
        <button className="btn" onClick={sendCompetence}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Competence;
