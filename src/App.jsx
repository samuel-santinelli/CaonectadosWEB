import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { DefaultLayout } from "./layout/DefaultLayout";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <DefaultLayout />
    </MantineProvider>
  );
}
