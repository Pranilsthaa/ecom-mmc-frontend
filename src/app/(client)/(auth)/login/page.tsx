"use client";

import LoginForm from "@/components/forms/loginform";
import React from "react";

const Login = () => {
  const handleLogin = () => {};
  return (
    <div>
      <LoginForm handleLogin={handleLogin} />
    </div>
  );
};

export default Login;
