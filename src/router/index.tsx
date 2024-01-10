import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ViewProducts from "../components/ViewProducts/viewProducts";
import LoginPage from "../Pages/LoginPage/loginPage";
import ProtectedRoutes from "./protectedRoutes";
import OrderDetails from "../components/OrderDetails/orderDetails";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/login"
          element={
            <ProtectedRoutes>
              <LoginPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/view-products"
          element={
            <ProtectedRoutes>
              <ViewProducts />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/:orderID/order-details"
          element={
            <ProtectedRoutes>
              <OrderDetails />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
