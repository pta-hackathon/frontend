import React, { useEffect, useState } from "react";
import { User, client } from "./api";

const Auth = () => {
  const [selectedUsername, setSelectedUsername] = React.useState<string | undefined>(undefined);
  const [users, setUsers] = useState([] as User[]);
  const [user, setUser] = useState<User | null>(null);

  const reloadUsers = async () => {
    const result = await client.GET("/userliste");
    if (result.data) {
      setUsers(result.data);
      if (!selectedUsername && result.data.length > 0) setSelectedUsername(result.data[0].name);
    }
  };

  useEffect(() => {
    reloadUsers();
  }, []);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username !== selectedUsername) {
      setUser(null);
      return;
    }
    const userIndex = users.findIndex((predicate) => predicate.name === username);
    if (userIndex === -1) {
      setUser(null);
      return;
    }
    setUser(users[userIndex]);
  }, [users, selectedUsername]);

  const login = async () => {
    if (!selectedUsername) return;
    await client.POST("/anmelden", { params: { query: { user: selectedUsername } } });
    await reloadUsers();
    localStorage.setItem("username", selectedUsername);
  };

  const logout = async () => {
    if (user?.name === undefined) return;
    await client.POST("/abmelden", { params: { query: { user: user.name } } });
    await reloadUsers();
    localStorage.removeItem("username");
  };

  return (
    <div className="flex items-center gap-2">
      {user ? (
        <>
          <span className="text-lg">Logged in as {user.name}</span>
          <button className="btn" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <select className="select" value={selectedUsername} onChange={(e) => setSelectedUsername(e.target.value)}>
            {users.map((user) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
          <button className="btn" onClick={login}>
            Login
          </button>
        </>
      )}
    </div>
  );
};

export default Auth;
