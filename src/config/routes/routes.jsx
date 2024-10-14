import DashboardLayout from "../../layout/Dashboard/DashboardLayout";
import { DefaultLayout } from "../../layout/DefaultLayout/DefaultLayout";

const defineRoutes = async () => {
  const routes = [
    {
      path: "*",
      name: "Dashboard View",
      element: <DefaultLayout />,
    },
    {
      path: "/",
      name: "Dashboard View",
      element: <DashboardLayout />,
    },
  ];

  return routes;
};

export default defineRoutes;
