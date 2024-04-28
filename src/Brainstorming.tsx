import React, { useState } from "react";

import { Icon } from "@iconify/react";

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
    <>
      <div className="flex flex-col flex-wrap gap-2">
        {items.map((item) => (
          <BrainstormingItem key={item.id} {...item} />
        ))}
      </div>
      <div className="col-span-3 flex justify-center gap-2">
        <input
          type="text"
          placeholder="What comes to mind?"
          className="input"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn">Submit</button>
      </div>
    </>
  );
};

export default Brainstorming;
