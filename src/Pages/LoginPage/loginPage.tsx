// src/pages/LoginPage.tsx
import React from "react";
import LoginForm from "../../components/LoginForm/loginForm";
import { loginUser } from "../../Api/loginUser";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigation = useNavigate();
  const handleLogin = (email: string, password: string) => {
    // Implement your login logic here
    console.log("Logging in with:", { email, password });

    loginUser({ email, password })
      .then((res) => {
        localStorage.setItem("token", res.access_token);
        navigation("/view-products");
      })
      .catch((error) => {});
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
