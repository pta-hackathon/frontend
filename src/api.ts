import createClient from "openapi-fetch";
import type { paths } from "./api-types";

export const client = createClient<paths>({ baseUrl: "http://172.17.28.33:8080/" });

export type User = paths["/userliste"]["get"]["responses"]["200"]["content"]["*/*"][0];
export type Stage = "warte_logon" | "warte_kompetenz" | "warte_brainstorming" | "ende";

export const stageNames: Record<Stage, string> = {
  warte_logon: "Waiting",
  warte_kompetenz: "Competence",
  warte_brainstorming: "Brainstorming",
  ende: "Results",
};
