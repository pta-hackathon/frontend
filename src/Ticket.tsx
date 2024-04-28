import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Ticket as TicketType, client } from "./api";

export const TICKET_ID = 1;

const Ticket = () => {
  const [ticket, setTicket] = useState<TicketType | null>(null);

  useEffect(() => {
    const getTickets = async () => {
      const result = await client.GET("/tickets");
      const ticket = result.data?.find((predicate) => predicate.id === TICKET_ID);
      if (ticket) {
        setTicket(ticket);
      }
    };

    getTickets();
  }, []);

  return (
    <div className="flex flex-col gap-4 rounded border bg-white px-4 py-2">
      <h3 className="text-xl font-semibold">{ticket?.text || "Waiting for Ticket..."}</h3>
      {ticket ? (
        <p>
          Für die Fehlersuche und -behebung in Computersystemen werden häufig spezielle Tools und Skripte benötigt. Eine
          solche Methode, die für viele IT-Experten entscheidend ist, ist die Verwendung von Minidump-Dateien. Diese
          Dateien bieten eine Momentaufnahme des aktiven Speichers, wenn ein Computer abstürzt, und liefern unschätzbare
          Daten für die Analyse nach dem Absturz.
        </p>
      ) : (
        <div className="flex h-36 items-center justify-center text-3xl">
          <Icon icon="gg-spinner" className="animate-spin" />
        </div>
      )}
    </div>
  );
};

export default Ticket;
