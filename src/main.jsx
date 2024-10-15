import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MantineProvider } from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import "./main.module.css"
// import { Notifications } from "@mantine/notifications";

export function Main() {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "color-scheme",
    defaultValue: "light",
  });

  const toggleColorScheme = () =>
    setColorScheme((current) => (current === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (

      <MantineProvider
        theme={{ colorScheme, loader: "dots" }}
        withGlobalStyles
        withNormalizeCSS
      >
        {/* <Notifications /> */}
        <App />
      </MantineProvider>

  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);


