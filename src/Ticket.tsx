import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Ticket as TicketType, client } from "./api";

const TICKET_ID = 1;

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
      <h3 className="text-3xl font-semibold">{ticket?.text || "Waiting for Ticket..."}</h3>
      {ticket ? (
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin turpis quam, efficitur in urna sed, posuere
          faucibus ex. Vivamus maximus nulla at ligula interdum consectetur. Aliquam porttitor efficitur lectus id
          consequat. Suspendisse aliquet, libero vitae pharetra fermentum, ante metus aliquet ante, nec lacinia tortor
          nibh vel leo.
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
