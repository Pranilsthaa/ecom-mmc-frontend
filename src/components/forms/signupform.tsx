"use client";

import type React from "react";
import {
  Heart,
  Camera,
  Frame,
  Star,
  ArrowRight,
  Mail,
  Lock,
  User,
  Phone,
  Gift,
} from "lucide-react";
import { TsignupData } from "@/hooks/api/useSignup";
import { useRouter } from "next/navigation";
import InputField from "../ui/inputField";
import LoadingIndicator from "../ui/LoadingIndicator";
import { useState } from "react";

interface SignupFormProps {
  handleSignup: (data: TsignupData) => void;
  isLoading: boolean;
  setActiveForm: React.Dispatch<React.SetStateAction<"login" | "signup">>;
}

export default function SignupForm({
  handleSignup,
  isLoading,
  setActiveForm,
}: SignupFormProps) {
  const router = useRouter();

  const [signupData, setSignupData] = useState<TsignupData>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSignup(signupData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof TsignupData
  ) => {
    setSignupData({ ...signupData, [key]: e.target.value });
  };

  return (
    <div className="w-full">
      <div className="w-full h-[600px] sm:h-[600px] md:h-[620px] bg-[var(--color-background)] rounded-2xl overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4 sm:space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-[var(--color-foreground)]">
              Create Your Account
            </h2>
            <p className="text-[var(--color-secondary)]">
              Start preserving your precious memories today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <InputField
                  label="First Name"
                  labelFor="firstName"
                  placeholder="Enter first name"
                  id="firstName"
                  Icon={User}
                  value={signupData.firstname}
                  onChange={(e) => handleChange(e, "firstname")}
                />
              </div>
              <div className="space-y-2">
                <InputField
                  label="Last Name"
                  labelFor="lastName"
                  placeholder="Enter last name"
                  id="lastName"
                  Icon={User}
                  value={signupData.lastname}
                  onChange={(e) => handleChange(e, "lastname")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <InputField
                label="Email Address"
                labelFor="email"
                placeholder="Enter email address"
                id="email"
                Icon={Mail}
                type="email"
                value={signupData.email}
                onChange={(e) => handleChange(e, "email")}
              />
            </div>

            <div className="space-y-2">
              <InputField
                label="Phone Number"
                labelFor="phone"
                placeholder="+977 123-4567"
                id="phone"
                Icon={Phone}
                type="number"
                value={signupData.phone}
                onChange={(e) => handleChange(e, "phone")}
              />
            </div>

            <div className="space-y-2">
              <InputField
                label="Password"
                labelFor="password"
                placeholder="••••••••"
                id="password"
                type="password"
                Icon={Lock}
                isPassword
                value={signupData.password}
                onChange={(e) => handleChange(e, "password")}
              />
            </div>

            <div className="space-y-2">
              <InputField
                label="Confirm Password"
                labelFor="confirmPassword"
                placeholder="••••••••"
                id="confirmPassword"
                Icon={Lock}
                isPassword
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 w-4 h-4 text-rose-600 bg-[var(--color-input-bg)] border-[var(--color-border)] rounded focus:ring-rose-500 focus:ring-2"
                  required
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-[var(--color-secondary)] leading-relaxed"
                >
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-rose-600 hover:text-rose-700 font-medium hover:underline transition-colors duration-200"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-rose-600 hover:text-rose-700 font-medium hover:underline transition-colors duration-200"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="newsletter"
                  className="mt-1 w-4 h-4 text-rose-600 bg-[var(--color-input-bg)] border-[var(--color-border)] rounded focus:ring-rose-500 focus:ring-2"
                />
                <label
                  htmlFor="newsletter"
                  className="text-sm text-[var(--color-secondary)]"
                >
                  Send me updates about new products and special offers
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <LoadingIndicator />
              ) : (
                <>
                  <span>Create Your Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--color-border)]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[var(--color-background)] text-[var(--color-secondary)]">
                Or sign up with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center px-4 py-3 border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-muted)] transition-colors duration-200 bg-[var(--color-background)]">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-sm font-medium text-[var(--color-foreground)]">
                Google
              </span>
            </button>
            <button className="flex items-center justify-center px-4 py-3 border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-muted)] transition-colors duration-200 bg-[var(--color-background)]">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="text-sm font-medium text-[var(--color-foreground)]">
                Facebook
              </span>
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-[var(--color-secondary)]">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setActiveForm("login")}
                className="text-rose-600 hover:text-rose-700 font-semibold transition-colors duration-200 hover:underline"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
