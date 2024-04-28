import createClient from "openapi-fetch";
import type { paths } from "./api-types";

export const client = createClient<paths>({ baseUrl: "http://172.17.28.33:8080/" });

export type User = paths["/userliste"]["get"]["responses"]["200"]["content"]["*/*"][0];
export type Stage = "warte_logon" | "warte_kompetenz" | "warte_brainstorming" | "warte_estimation" | "ende";
export type Ticket = paths["/tickets"]["get"]["responses"]["200"]["content"]["*/*"][0];
export type Estimation = paths["/schaetzungen"]["get"]["responses"]["200"]["content"]["*/*"][0];
export type BrainstormingItem = paths["/brainstorming"]["get"]["responses"]["200"]["content"]["*/*"][0];
export type Competence = "rot" | "gelb" | "gruen";

export const stageNames: Record<Stage, string> = {
  warte_logon: "Waiting",
  warte_kompetenz: "Competence",
  warte_brainstorming: "Brainstorming",
  warte_estimation: "Estimation",
  ende: "Results",
};

export const competenceNames: Record<Competence, string> = {
  rot: "Master",
  gelb: "Ganz okay",
  gruen: "Nicht so gut",
};
