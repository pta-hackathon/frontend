import React from "react";
import { Icon } from "@iconify/react";

const Player = ({ name, hasSelected }: { name: string; hasSelected: boolean }) => {
  return (
    <div className="flex items-center gap-4 rounded border bg-white p-4">
      <h3 className="text-xl font-bold">{name}</h3>
      <div className="text-2xl">
        {hasSelected ? <Icon icon="mdi-check" /> : <Icon icon="gg-spinner" className="animate-spin" />}
      </div>
    </div>
  );
};

const Poker = () => {
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
      <div className="flex flex-col gap-4 bg-black"></div>
      <div className="place-self-start self-center">
        <Player name="Charlie" hasSelected={true} />
      </div>
    </div>
  );
};

export default Poker;
