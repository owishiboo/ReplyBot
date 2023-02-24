import React, { useEffect, useRef } from "react";
import styles from "../styles/main.module.css";

export default function Messages({ messages }) {
  const el = useRef(null);
  useEffect(() => {
    el.current.scrollIntoView({ block: "end", behavior: "smooth" });
  });
  return (
    <div className={styles.messages}>
      {messages}
      <div id={"el"} ref={el} />
    </div>
  );
}
