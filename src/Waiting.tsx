import React from "react";
import api from "./api";
import { useMutation } from "@tanstack/react-query";

const Waiting = () => {
  const mutation = useMutation({
    mutationFn: api.start,
  });

  return (
    <form>
      <input type="text" placeholder="User Story" />
      <button
        onClick={(event) => {
          event.preventDefault();
          mutation.mutate();
        }}
      >
        Start
      </button>
    </form>
  );
};

export default Waiting;
