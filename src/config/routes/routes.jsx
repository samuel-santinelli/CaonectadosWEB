import DashboardLayout from "../../layout/Dashboard/DashboardLayout";
import { DefaultLayout } from "../../layout/DefaultLayout/DefaultLayout";
import DiscountHeaderLayout from "../../layout/DiscountHeader/DiscountHeaderLayout";

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
      path: "/discount",
      name: "Discount View",
      element: <DiscountHeaderLayout />,
    },
  ];

  return routes;
};

export default defineRoutes;
