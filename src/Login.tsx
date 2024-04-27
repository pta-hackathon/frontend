import React from "react";
import api from "./api";
import { useQuery } from "@tanstack/react-query";

const usernames = ["alice", "bob", "charlie"];

const Login = () => {
  const [username, setUsername] = React.useState(usernames[0]);

  const { isPending, error } = useQuery({ queryKey: ["login"], queryFn: api.login("alice") });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <select value={username} onChange={(e) => setUsername(e.target.value)}>
        {usernames.map((username) => (
          <option key={username} value={username}>
            {username}
          </option>
        ))}
      </select>
      <button
        onClick={(e) => {
          e.preventDefault();
          api.login(username);
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
