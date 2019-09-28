import React, { useState, useCallback } from "react";
import "./ChatInput.css";

export default function ChatInput({ onEnter }) {
  const [value, setValue] = useState("");
  const onKeyDown = event => {
    if (event.key === "Enter") {
      onEnter(value);
      setValue("");
    }
  };
  return (
    <input
      className="chat-input"
      placeholder="Enter your message"
      value={value}
      onChange={event => setValue(event.target.value)}
      onKeyDown={onKeyDown}
    />
  );
}
