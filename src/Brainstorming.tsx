import React, { useState } from "react";
import { Button } from "@/components/ui/button";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Ticket from "./Ticket";
import { Icon } from "@iconify/react";
import { Brain } from "lucide-react";

type Competence = "red" | "yellow" | "green";

export const Player = ({ name, hasSelected }: { name: string; hasSelected: boolean }) => {
  return (
    <div className="flex items-center gap-4 rounded border bg-white p-4">
      <h3 className="text-xl font-bold">{name}</h3>
      <div className="text-2xl">
        {hasSelected ? <Icon icon="mdi-check" /> : <Icon icon="gg-spinner" className="animate-spin" />}
      </div>
    </div>
  );
};

const items: BrainstormingItemProps[] = [
  { id: 1, username: "Alice", text: "Datenbank Tabelle erstellen" },
  { id: 2, username: "Bob", text: "Port in Firewall freischalten" },
  { id: 3, username: "Bob", text: "Port in Firewall freischalten and other stuff" },
];

interface BrainstormingItemProps {
  id: number;
  text: string;
  username: string;
}

const BrainstormingItem = ({ username, text }: BrainstormingItemProps) => {
  return (
    <div className="flex grow flex-col rounded border bg-white px-2 py-1">
      <span className="font-bold">{username}:</span>
      <span>{text}</span>
    </div>
  );
};

const Brainstorming = () => {
  const [text, setText] = useState<string | undefined>(undefined);
  return (
    <div className="grid h-full grid-cols-[1fr_2fr_1fr] grid-rows-[1fr_auto_1fr] items-center gap-32 p-4">
      <div></div>
      <div className="place-self-center self-end">
        <Player name="Alice" hasSelected />
      </div>
      <div></div>
      <div className="place-self-end self-center">
        <Player name="Bob" hasSelected={false} />
      </div>
      <div className="flex flex-col gap-4">
        <Ticket />
        <div className="flex flex-col flex-wrap gap-2">
          {items.map((item) => (
            <BrainstormingItem key={item.id} {...item} />
          ))}
        </div>
      </div>
      <div className="place-self-start self-center">
        <Player name="Charlie" hasSelected={true} />
      </div>
      <div className="col-span-3 flex justify-center gap-2 self-start">
        <input
          type="text"
          placeholder="Enter text"
          className="input"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn">Submit</button>
      </div>
    </div>
  );
};

export default Brainstorming;
