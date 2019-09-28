import React from "react";
import './ChatMessage.css';

export default function ChatMessage({ message, className }) {
  const messageClassName = `message ${className}`;
  return <div className={messageClassName}>{message}</div>;
}
