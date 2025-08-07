"use client";
import LoginForm from "@/components/forms/loginform";
import SignupForm from "@/components/forms/signupform";
import { useSignup } from "@/hooks/api/useSignup";
import React from "react";

const Signup = () => {
  const { mutate, isPending } = useSignup();
  return (
    <div>
      <SignupForm handleSignup={mutate} isLoading={isPending} />
    </div>
  );
};

export default Signup;
