const BASE_PATH = "http://localhost:8000/";

interface User {
  id: number;
  name: string;
  isSignedIn: boolean;
  competence: string | null;
}

type Confidence = "red" | "yellow" | "green";

export default {
  getUsers: async (): Promise<User[]> => {
    const response = await fetch(BASE_PATH + "userliste");
    return response.json();
  },
  login: (username: string) => async (): Promise<void> => {
    await fetch(BASE_PATH + "anmelden?user=" + username, {
      method: "POST",
    });
  },
  logout: async (): Promise<void> => {
    await fetch(BASE_PATH + "logout", {
      method: "POST",
      credentials: "include",
    });
  },
  start: async (): Promise<void> => {
    const response = await fetch(BASE_PATH + "start", {
      credentials: "include",
      method: "POST",
    });
    console.log(response);
  },
  submitConfidence: async (confidence: Confidence): Promise<void> => {
    await fetch(BASE_PATH + "confidence?confidence=" + confidence, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ confidence }),
    });
  },
};
