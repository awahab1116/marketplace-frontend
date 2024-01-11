import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ViewProductsPage from "../Pages/ViewProducts/viewProductsPage";
import LoginPage from "../Pages/LoginPage/loginPage";
import ProtectedRoutes from "./protectedRoutes";
import OrderDetailsPage from "../Pages/ViewOrder/viewOrder";

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
              <ViewProductsPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/:orderId/order-details"
          element={
            <ProtectedRoutes>
              <OrderDetailsPage />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
