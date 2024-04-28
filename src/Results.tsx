import React, { useEffect, useState } from "react";
import { Result, client } from "./api";

const Results = ({ goBack }: { goBack: () => void }) => {
  const [results, setResults] = useState<Result[]>([]);

  const updateResults = async () => {
    const result = await client.GET("/calctabelle");
    if (result.data) setResults(result.data);
  };

  useEffect(() => {
    const interval = setInterval(updateResults, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-center text-3xl font-semibold text-white">Schätzung abgeschlossen</h2>
      <div className="mx-24 flex flex-col gap-1 text-lg font-semibold text-white">
        {results.map((result) => (
          <div className="flex justify-between">
            <div>{result.userName}</div>
            <div>{result.punkteSumme}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button className="btn" onClick={goBack}>
          Zurück
        </button>
      </div>
    </div>
  );
};

export default Results;
