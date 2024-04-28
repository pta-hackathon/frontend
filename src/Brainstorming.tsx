import React, { useEffect, useState } from "react";

import { Icon } from "@iconify/react";
import { client } from "./api";
import type { BrainstormingItem as BrainstormingItemType, User } from "./api";

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

interface BrainstormingItemProps {
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

const Brainstorming = ({ users }: { users: User[] }) => {
  const [text, setText] = useState<string | undefined>(undefined);
  const [items, setItems] = useState<BrainstormingItemType[]>([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const result = await client.GET("/brainstorming");
      if (result.data) setItems(result.data);
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <>
      <div className="flex flex-col flex-wrap gap-2">
        {items.map((item) => (
          <BrainstormingItem
            key={item.id}
            username={users.find((u) => u.id === item.idUser)?.name || ""}
            text={item.text || ""}
          />
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
