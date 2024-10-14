import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { DefaultLayout } from "./layout/DefaultLayout/DefaultLayout";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
      <DefaultLayout />
      </BrowserRouter>
    </MantineProvider>
  );
}
