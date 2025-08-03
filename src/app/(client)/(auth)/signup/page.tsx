"use client";
import LoginForm from "@/components/forms/loginform";
import SignupForm from "@/components/forms/signupform";
import React from "react";

const Signup = () => {
  const handleSignup = () => {};
  return (
    <div>
      <SignupForm handleSignup={handleSignup} />
    </div>
  );
};

export default Signup;
