import createClient from "openapi-fetch";
import type { paths } from "./api-types";

export const client = createClient<paths>({ baseUrl: "http://172.17.28.33:8080/" });

export type User = paths["/userliste"]["get"]["responses"]["200"]["content"]["*/*"][0];
export type Stage = "warte_logon" | "warte_kompetenz" | "warte_brainstorming" | "ende_schaetzung" | "ende";
export type Ticket = paths["/tickets"]["get"]["responses"]["200"]["content"]["*/*"][0];
export type Estimation = paths["/schaetzungen"]["get"]["responses"]["200"]["content"]["*/*"][0];
export type BrainstormingItem = paths["/brainstorming"]["get"]["responses"]["200"]["content"]["*/*"][0];
export type Competence = "rot" | "gelb" | "gruen";
export type Result = paths["/calctabelle"]["get"]["responses"]["200"]["content"]["*/*"][0];

export const stageNames: Record<Stage, string> = {
  warte_logon: "Warten auf Anmeldung",
  warte_kompetenz: "Kompetenzwahl",
  warte_brainstorming: "Brainstorming",
  ende_schaetzung: "Schätzung",
  ende: "Ergebnis",
};

export const competenceNames: Record<Competence, string> = {
  rot: "Master",
  gelb: "Ganz okay",
  gruen: "Nicht so gut",
};
