"use client";

import LoginForm from "@/components/forms/loginform";
import { useLogin } from "@/hooks/auth/useLogin";
import React from "react";
import { toast } from "sonner";

const Login = () => {
  const { mutate, isPending } = useLogin();

  return (
    <div>
      <LoginForm handleLogin={mutate} isLoading={isPending} />
    </div>
  );
};

export default Login;
