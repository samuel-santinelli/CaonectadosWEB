import DashboardLayout from "../../layout/Dashboard/DashboardLayout";
import { DefaultLayout } from "../../layout/DefaultLayout/DefaultLayout";
import FinalizePurchase from "../../layout/FinalizePurchase/FinalizePurchase";
import RegisterProduct from "../../layout/RegisterProduct/RegisterProduct";
import RegisterUser from "../../layout/RegisterUser/RegisterUser";


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
    {
      path: "/user-register",
      name: "Register User View",
      element: <RegisterUser />,
    },
    {
      path: "/product-register",
      name: "Register Product View",
      element: <RegisterProduct />,
    },
    
  ];

  return routes;
};

export default defineRoutes;
