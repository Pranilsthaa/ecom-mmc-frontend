import React, { useState } from "react";
import LoginForm from "./loginform";
import SignupForm from "./signupform";
import { useLogin } from "@/hooks/api/useLogin";
import { useSignup } from "@/hooks/api/useSignup";
import { motion, AnimatePresence } from "motion/react";

const LoginSignupSwitcher = () => {
  const [activeForm, setActiveForm] = useState<"login" | "signup">("login");
  const { mutate: login, isPending } = useLogin();
  const { mutate: signup, isPending: isSignupPending } = useSignup(() =>
    setActiveForm("login")
  );

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        {activeForm === "login" ? (
          <motion.div
            key="login"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{
              opacity: { duration: 0.2 },
            }}
            className="w-full"
          >
            <LoginForm
              handleLogin={login}
              isLoading={isPending}
              setActiveForm={setActiveForm}
            />
          </motion.div>
        ) : (
          <motion.div
            key="signup"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{
              opacity: { duration: 0.2 },
            }}
            className="w-full"
          >
            <SignupForm
              handleSignup={signup}
              isLoading={isSignupPending}
              setActiveForm={setActiveForm}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginSignupSwitcher;
