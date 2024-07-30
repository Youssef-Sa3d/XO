import React, { useState } from "react";
import "./player.css";

export default function Player({ name, s, isActive, onChangeName }) {
  const [playerName, setName] = useState(name);
  const [edit, setEdit] = useState(false);
  let pl = <p>{playerName}</p>;
  let btn = "Edit";

  if (edit) {
    pl = (
      <input
        type="text"
        value={playerName}
        required
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
    );
    btn = "Save";
  }

  function handleEdit() {
    setEdit((editing) => !editing);
    if (edit) {
      onChangeName(s, playerName);
    }
  }

  return (
    <li className={`player ${isActive ? "active" : undefined}`}>
      {pl}
      <p className="xo">{s}</p>
      <button type="button" onClick={handleEdit}>
        {btn}
      </button>
    </li>
  );
}
