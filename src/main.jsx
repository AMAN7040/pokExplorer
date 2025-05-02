import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryclient } from "./lib/react-client.js";
import { PaginationProvider } from "./features/pokemon/context/PaginationContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryclient}>
        <PaginationProvider>
          <App />
        </PaginationProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
