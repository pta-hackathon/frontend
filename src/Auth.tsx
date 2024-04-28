import React, { useEffect, useState } from "react";
import { User, client } from "./api";

const Auth = ({
  users,
  setUsers,
  user,
  setUser,
}: {
  users: User[];
  setUsers: (users: User[]) => void;
  user: User | null;
  setUser: (user: User | null) => void;
}) => {
  const [selectedUsername, setSelectedUsername] = useState<string | "">("");

  const reloadUsers = async () => {
    const result = await client.GET("/userliste");
    if (result.data) {
      setUsers(result.data);
    }
  };

  useEffect(() => {
    const interval = setInterval(reloadUsers, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const selectedUser = users.find((u) => u.name === selectedUsername);
    setUser(selectedUser?.isSignedIn ? selectedUser : null);
  }, [users, selectedUsername]);

  const login = async () => {
    if (!selectedUsername) return;
    await client.POST("/anmelden", { params: { query: { user: selectedUsername } } });
    await reloadUsers();
  };

  const logout = async () => {
    if (user?.name === undefined) return;
    await client.POST("/abmelden", { params: { query: { user: user.name } } });
    await reloadUsers();
  };

  return (
    <div className="flex items-center gap-2">
      {/* {user && (
        <>
          <span className="text-lg text-white">
            Logged in as <span className="font-bold">{user.name}</span>
          </span>
        </>
      )} */}
      <select className="select" value={selectedUsername} onChange={(e) => setSelectedUsername(e.target.value)}>
        <option disabled value="">
          Select a user
        </option>
        {users.map((user) => (
          <option key={user.id} value={user.name}>
            {user.name}
          </option>
        ))}
      </select>
      {user ? (
        <button className="btn" onClick={logout}>
          Logout
        </button>
      ) : (
        <button className="btn" onClick={login} disabled={selectedUsername === ""}>
          Login
        </button>
      )}
    </div>
  );
};

export default Auth;
