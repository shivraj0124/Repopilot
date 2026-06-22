"use client";

import { useState } from "react";
import Link from "next/link";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle } from "lucide-react";
import "../auth.css"; // ← adjust path to wherever you put auth.css
import { useAuth } from "@/context/AuthContext";
export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const { setIsLoggedIn, refreshUser } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const res = await api.post("/auth/login", formData);
      document.cookie = `token=${res.data.token}; path=/`;
      await refreshUser();
      router.push("/dashboard");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page px-4 py-10">
      {/* Background */}
      <div className="auth-grid-bg">
        <div className="auth-grid-lines" />
        <div className="auth-radial-glow" />
      </div>

      {/* Card */}
      <div className="auth-card relative w-full max-w-md rounded-2xl px-8 py-10 z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="auth-logo-ring w-14 h-14 rounded-2xl flex items-center justify-center mb-4">
            <FaGithub className="text-blue-400 text-2xl" />
          </div>
          <h1 className="auth-heading text-2xl font-bold text-center">
            Welcome back
          </h1>
          <p className="auth-sub text-sm mt-1 text-center">
            Sign in to your RepoPilot account
          </p>
        </div>

        <button
          onClick={() => {
            window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/github`;
          }}
          className="auth-oauth-btn mb-5"
        >
          <FaGithub size={17} />
          Continue with GitHub
        </button>

        {/* Divider */}
        <div className="relative flex items-center mb-5">
          <div className="flex-1 border-t auth-separator" />
          <span className="auth-separator-text">or sign in with email</span>
          <div className="flex-1 border-t auth-separator" />
        </div>

        {/* Error */}
        {error && (
          <div className="auth-alert auth-alert-error mb-5">
            <AlertCircle size={15} className="flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="auth-label block mb-1.5">Email address</label>
            <div className="auth-input-wrap">
              <Mail size={15} className="auth-input-icon" />
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="auth-input"
                required
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="auth-label">Password</label>
              <Link href="/forgot-password" className="auth-link text-xs">
                Forgot password?
              </Link>
            </div>
            <div className="auth-input-wrap">
              <Lock size={15} className="auth-input-icon" />
              <input
                type={showPwd ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="auth-input pr-10"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="auth-eye-btn"
                onClick={() => setShowPwd((p) => !p)}
                aria-label={showPwd ? "Hide password" : "Show password"}
              >
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="auth-submit-btn mt-2"
          >
            {loading ? (
              <>
                <span className="auth-spinner" />
                Signing in…
              </>
            ) : (
              <>
                <LogIn size={16} />
                Sign in
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="auth-sub text-sm text-center mt-6">
          Don't have an account?{" "}
          <Link href="/register" className="auth-link">
            Create one free
          </Link>
        </p>

        {/* Branding */}
        <p
          className="text-center mt-6 text-xs"
          style={{ color: "var(--auth-sub)", opacity: 0.5 }}
        >
          Secured by RepoPilot · AI-powered open source tools
        </p>
      </div>
    </div>
  );
}
