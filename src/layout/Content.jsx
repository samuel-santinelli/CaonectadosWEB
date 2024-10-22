import { Routes, Route } from "react-router-dom";
import { DefaultLayout } from "./DefaultLayout/DefaultLayout";
import DashboardLayout from "./Dashboard/DashboardLayout";
import FinalizePurchase from "./FinalizePurchase/FinalizePurchase";

const Content = () => {
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

  return (
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={route.element}
        />
      ))}
    </Routes>
  );
};

export default Content;
