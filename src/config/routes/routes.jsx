import DashboardLayout from "../../layout/Dashboard/DashboardLayout";
import { DefaultLayout } from "../../layout/DefaultLayout/DefaultLayout";
import FinalizePurchase from "../../layout/FinalizePurchase/FinalizePurchase";

const defineRoutes = async () => {
  const routes = [
    {
      path: "*",
      name: "Default View",
      element: <DefaultLayout />,
    },
    {
      path: "/",
      name: "Dashboard View",
      element: <DashboardLayout />,
    },
    {
      path: "/buy",
      name: "Finalize Purchase View",
      element: <FinalizePurchase />,
    },
    
  ];

  return routes;
};

export default defineRoutes;
