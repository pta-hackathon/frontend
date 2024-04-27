const BASE_PATH = "http://localhost:8000/";

interface User {
  id: number;
  name: string;
  isLoggedIn: boolean;
}

type Confidence = "red" | "yellow" | "green";

export default {
  getUsers: async (): Promise<User[]> => {
    const response = await fetch(BASE_PATH + "users");
    return response.json();
  },
  login: (username: string) => async (): Promise<boolean> => {
    await fetch(BASE_PATH + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username }),
    });
    return true;
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
