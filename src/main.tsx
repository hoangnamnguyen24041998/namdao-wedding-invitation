import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@ant-design/v5-patch-for-react-19";
// sal.js for scroll animations
import sal from "sal.js";
import "sal.js/dist/sal.css";

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Initialize sal after app mounts
setTimeout(() => {
  try {
    sal();
  } catch (e) {
    // ignore
  }
}, 0);
