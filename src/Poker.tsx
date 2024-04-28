import React from "react";
import { Icon } from "@iconify/react";
import Ticket from "./Ticket";
import { User } from "./api";

const Player = ({ user, waiting }: { user: User; waiting: boolean }) => {
  return (
    <div className="flex items-center gap-4 rounded border bg-white p-4">
      <h3 className="text-xl font-bold">{user.name}</h3>
      <div className="text-2xl">
        {waiting ? <Icon icon="gg-spinner" className="animate-spin" /> : <Icon icon="mdi-check" />}
      </div>
    </div>
  );
};

const Poker = ({ children, user, users }: React.PropsWithChildren & { user: User | null; users: User[] }) => {
  const otherUsers = users.filter((u) => u.name !== user?.name);
  return (
    <div className="grid h-full grid-cols-[1fr_2fr_1fr] grid-rows-[1fr_1fr_1fr] items-center gap-32 p-4">
      <div></div>
      <div className="place-self-center self-end">
        <Player user={otherUsers[0]} waiting />
      </div>
      <div className=""></div>
      <div className="place-self-end self-center">
        <Player user={otherUsers[1]} waiting={false} />
      </div>
      <div className="row-span-2 place-self-stretch self-stretch">
        <div className="flex h-full flex-col gap-4">
          <Ticket />
          {children}
        </div>
      </div>
      <div className="place-self-start self-center">
        <Player user={otherUsers[2]} waiting={true} />
      </div>
    </div>
  );
};

export default Poker;
