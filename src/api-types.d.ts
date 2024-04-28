/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/schaetzung": {
    post: operations["postEstimate"];
  };
  "/reset": {
    post: operations["reset"];
  };
  "/rateschaetzer": {
    post: operations["postRateEstimator"];
  };
  "/kompetenz": {
    post: operations["postUserAnmelden"];
  };
  "/brainstorming": {
    get: operations["getBrainstorming"];
    post: operations["postBrainstorming"];
  };
  "/anmelden": {
    post: operations["postUserAnmelden_1"];
  };
  "/abmelden": {
    post: operations["postUserAbmelden"];
  };
  "/userliste": {
    get: operations["getUserListe"];
  };
  "/tickets": {
    get: operations["getTickets"];
  };
  "/stage": {
    get: operations["getStage"];
  };
  "/schaetzungen": {
    get: operations["getEstimates"];
  };
  "/calctabelle": {
    get: operations["getCalcTabelle"];
  };
  "/calcmittelwert": {
    get: operations["getCalcMittelwert"];
  };
  "/calckonsistenz": {
    get: operations["getCalcKonsistenz"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    StatusMsg: {
      msg?: string;
    };
    User: {
      /** Format: int32 */
      id?: number;
      name?: string;
      competence?: string;
      /** Format: int32 */
      isSignedIn?: number;
      /** Format: int32 */
      isTestUser?: number;
    };
    Tickets: {
      /** Format: int32 */
      id?: number;
      text?: string;
      /** Format: double */
      actualEffort?: number;
    };
    Estimate: {
      /** Format: int32 */
      id?: number;
      /** Format: int32 */
      idUser?: number;
      /** Format: int32 */
      idTicket?: number;
      /** Format: double */
      minVal?: number;
      /** Format: double */
      maxVal?: number;
    };
    TabellenEintrag: {
      /** Format: int32 */
      idUser?: number;
      userName?: string;
      /** Format: double */
      punkteSumme?: number;
    };
    Brainstorming: {
      /** Format: int32 */
      id?: number;
      /** Format: int32 */
      idUser?: number;
      /** Format: int32 */
      idTicket?: number;
      text?: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {

  postEstimate: {
    parameters: {
      query: {
        user: string;
        ticket: number;
        minval: number;
        maxval: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["StatusMsg"];
        };
      };
    };
  };
  reset: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["StatusMsg"];
        };
      };
    };
  };
  postRateEstimator: {
    parameters: {
      query: {
        user: string;
        tipuser: string;
        idticket: number;
        idschaetzung: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  postUserAnmelden: {
    parameters: {
      query: {
        user: string;
        kompetenz: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["StatusMsg"];
        };
      };
    };
  };
  getBrainstorming: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["Brainstorming"][];
        };
      };
    };
  };
  postBrainstorming: {
    parameters: {
      query: {
        user: string;
        idticket: number;
        text: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["StatusMsg"];
        };
      };
    };
  };
  postUserAnmelden_1: {
    parameters: {
      query: {
        user: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["StatusMsg"];
        };
      };
    };
  };
  postUserAbmelden: {
    parameters: {
      query: {
        user: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["StatusMsg"];
        };
      };
    };
  };
  getUserListe: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["User"][];
        };
      };
    };
  };
  getTickets: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["Tickets"][];
        };
      };
    };
  };
  getStage: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["StatusMsg"];
        };
      };
    };
  };
  getEstimates: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["Estimate"][];
        };
      };
    };
  };
  getCalcTabelle: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["TabellenEintrag"][];
        };
      };
    };
  };
  getCalcMittelwert: {
    parameters: {
      query: {
        ticket: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": number;
        };
      };
    };
  };
  getCalcKonsistenz: {
    parameters: {
      query: {
        ticket: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": number;
        };
      };
    };
  };
}
