import React, { useEffect } from "react";

const Results = () => {
  const [results, setResults] = React.useState([]);

  const updateResults = async () => {
    // const result = await client.GET("/results");
    // if (result.data) setResults(result.data.filter((e) => e.idTicket === TICKET_ID));
  };

  useEffect(() => {
    const interval = setInterval(updateResults, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-center text-3xl font-semibold text-white">Schätzung abgeschlossen</h2>
    </div>
  );
};

export default Results;
