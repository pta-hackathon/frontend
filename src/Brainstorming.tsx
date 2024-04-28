import React, { useEffect, useState } from "react";

import { client } from "./api";
import type { BrainstormingItem as BrainstormingItemType, User } from "./api";
import { TICKET_ID } from "./Ticket";

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

const Brainstorming = ({ user, users }: { user: User | null; users: User[] }) => {
  const [text, setText] = useState<string>("");
  const [items, setItems] = useState<BrainstormingItemType[]>([]);

  const updateItems = async () => {
    const result = await client.GET("/brainstorming");
    if (result.data) setItems(result.data);
  };

  useEffect(() => {
    const interval = setInterval(updateItems, 1000);
    return () => clearInterval(interval);
  });

  const sendText = async () => {
    if (!text || !user?.name) return;
    await client.POST("/brainstorming", { params: { query: { user: user.name, text, idticket: TICKET_ID } } });
    setText("");
    await updateItems();
  };

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
        <button className="btn" disabled={text === "" || !user?.name} onClick={sendText}>
          Submit
        </button>
      </div>
    </>
  );
};

export default Brainstorming;
