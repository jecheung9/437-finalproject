import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
import "./index.css";
import "./tokens.css";
import CreateEvent from "./CreateEvent.tsx";
import App from "./App.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <CreateEvent /> */}
    <App />
  </StrictMode>,
)
