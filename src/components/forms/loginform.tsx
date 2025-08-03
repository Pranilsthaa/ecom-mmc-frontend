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
  MailIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import InputField from "../ui/inputField";
import axios from "axios";
import LoadingIndicator from "../ui/LoadingIndicator";

interface LoginFormProps {
  handleLogin: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => void;
  isLoading: boolean;
}

export default function LoginForm({ handleLogin, isLoading }: LoginFormProps) {
  const [loginCred, setLoginCred] = useState({ email: "", password: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: "email" | "password"
  ) => {
    setLoginCred({ ...loginCred, [key]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(loginCred);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-rose-300 rounded-full"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border-2 border-amber-300 rounded-lg rotate-45"></div>
        <div className="absolute bottom-32 left-32 w-28 h-28 border-2 border-orange-300 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 border-2 border-rose-300 rounded-lg rotate-12"></div>
      </div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col justify-center space-y-8 p-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <Frame className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
                MemoryFrame
              </h1>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-800 leading-tight">
                Welcome Back to Your
                <span className="block bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
                  Memory Collection
                </span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Sign in to access your preserved memories, track your orders,
                and continue creating beautiful keepsakes from your most
                precious moments.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-white/50 rounded-xl backdrop-blur-sm border border-white/30 shadow-sm">
                <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Camera className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Your Gallery Awaits
                  </h3>
                  <p className="text-sm text-gray-600">
                    Access all your uploaded photos and projects
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-white/50 rounded-xl backdrop-blur-sm border border-white/30 shadow-sm">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Order History</h3>
                  <p className="text-sm text-gray-600">
                    Track your memory preservation journey
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
              <span className="ml-2 text-gray-600 font-medium">
                Trusted by 2,500+ families
              </span>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex justify-center">
          <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="p-8 space-y-6">
              <div className="flex justify-center lg:hidden">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Frame className="w-5 h-5 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
                    MemoryFrame
                  </h1>
                </div>
              </div>

              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-gray-800">
                  Welcome Back
                </h2>
                <p className="text-gray-600">
                  Sign in to access your memory collection
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <InputField
                    id="email"
                    label="Email address"
                    labelFor="email"
                    type="email"
                    Icon={MailIcon}
                    onChange={(e) => handleChange(e, "email")}
                  />
                </div>

                <div className="space-y-2">
                  <InputField
                    id="password"
                    labelFor="password"
                    label="Password"
                    type="password"
                    Icon={Lock}
                    isPassword
                    onChange={(e) => handleChange(e, "password")}
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-rose-600 bg-gray-100 border-gray-300 rounded focus:ring-rose-500 focus:ring-2"
                    />
                    <span className="text-gray-600">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-rose-600 hover:text-rose-700 font-medium transition-colors duration-200 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <LoadingIndicator />
                  ) : (
                    <>
                      <span>Sign In to Your Account</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    Or sign in with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 bg-white/50 backdrop-blur-sm">
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
                  <span className="text-sm font-medium">Google</span>
                </button>
                <button className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 bg-white/50 backdrop-blur-sm">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="text-sm font-medium">Facebook</span>
                </button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    className="text-rose-600 hover:text-rose-700 font-semibold transition-colors duration-200 hover:underline"
                  >
                    Create your account
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
