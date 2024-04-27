import React, { useState } from "react";
import { Button } from "@/components/ui/button";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Ticket from "./Ticket";
import { Icon } from "@iconify/react";

type Competence = "red" | "yellow" | "green";

export const Player = ({ name, hasSelected }: { name: string; hasSelected: boolean }) => {
  return (
    <Card className="w-fit">
      <CardHeader>
        <CardTitle>{name} </CardTitle>
        <CardDescription>
          {hasSelected ? "Selected" : <Icon icon="gg-spinner" className="animate-spin text-xl" />}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

const Competence = () => {
  const [selectedCompetence, setSelectedCompetence] = useState<Competence | undefined>(undefined);
  return (
    <div className="grid h-full grid-cols-[1fr_2fr_1fr] grid-rows-[auto_1fr_auto_1fr] items-center gap-32 p-4">
      <h1 className="col-span-3 pt-10 text-center text-6xl font-semibold">Competence</h1>
      <div></div>
      <div className="place-self-center self-end">
        <Player name="Alice" hasSelected />
      </div>
      <div></div>
      <div className="place-self-end self-center">
        <Player name="Bob" hasSelected={false} />
      </div>
      <Ticket />
      <div>
        <Player name="Charlie" hasSelected={true} />
      </div>
      <div className="col-span-3 flex justify-center gap-2 self-start">
        <div className="max-w-sm">
          <Select value={selectedCompetence} onValueChange={(e) => setSelectedCompetence(e as Competence)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your Competence" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="red" className="">
                Meister
              </SelectItem>
              <SelectItem className="400" value="yellow">
                Ich kenn mich aus
              </SelectItem>
              <SelectItem className="00" value="green">
                Nicht Vertraut
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button>Submit</Button>
      </div>
    </div>
  );
};

export default Competence;
