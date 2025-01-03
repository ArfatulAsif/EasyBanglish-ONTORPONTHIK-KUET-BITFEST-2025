import { NextUIProvider } from "@nextui-org/react";
import { RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import router from "./routes/Router";
import { StrictMode } from "react";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/AuthContext";

createRoot(document.getElementById("root")).render(
  <>
    <Toaster />
    <AuthProvider>
      <RouterProvider router={router}>
        <NextUIProvider />
      </RouterProvider>
    </AuthProvider>
  </>
);
