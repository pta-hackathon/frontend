import React from "react";
import { Icon } from "@iconify/react";
import Ticket from "./Ticket";
import { User } from "./api";

const Player = ({ user }: { user: User }) => {
  return (
    <div className="flex items-center gap-4 rounded border bg-white p-4">
      <Icon icon="mdi-account" className="text-2xl" />
      <h3 className="text-xl font-bold">{user.name}</h3>
      <div className="text-2xl">
        {user.userstatus !== "fertig" ? <Icon icon="gg-spinner" className="animate-spin" /> : <Icon icon="mdi-check" />}
      </div>
    </div>
  );
};

const Poker = ({ children, user, users }: React.PropsWithChildren & { user: User | null; users: User[] }) => {
  const otherUsers = users.filter((u) => u.name !== user?.name);
  return (
    <div className="grid h-full grid-cols-[1fr_2fr_1fr] grid-rows-[1fr_1fr_minmax(1fr,_auto)] items-center gap-32 p-4">
      <div></div>
      <div className="place-self-center self-end">
        <Player user={otherUsers[0]} />
      </div>
      <div className=""></div>
      <div className="place-self-end self-center">
        <Player user={otherUsers[1]} />
      </div>
      <div className="row-span-2 place-self-stretch self-stretch">
        <div className="flex h-full flex-col gap-4">
          <Ticket />
          {children}
        </div>
      </div>
      <div className="place-self-start self-center">
        <Player user={otherUsers[2]} />
      </div>
    </div>
  );
};

export default Poker;
