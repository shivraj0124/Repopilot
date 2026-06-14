"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { FaGithub } from "react-icons/fa";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import "../auth.css";  

/* ── password strength helper ── */
function getStrength(pwd: string): { score: number; label: string; color: string } {
  if (!pwd) return { score: 0, label: "", color: "" };
  let score = 0;
  if (pwd.length >= 8)              score++;
  if (/[A-Z]/.test(pwd))           score++;
  if (/[0-9]/.test(pwd))           score++;
  if (/[^A-Za-z0-9]/.test(pwd))   score++;

  const map = [
    { label: "Weak",   color: "#ef4444" },
    { label: "Fair",   color: "#f97316" },
    { label: "Good",   color: "#eab308" },
    { label: "Strong", color: "#22c55e" },
  ];
  return { score, ...map[score - 1] ?? map[0] };
}

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading]   = useState(false);
  const [showPwd, setShowPwd]   = useState(false);
  const [error, setError]       = useState("");
  const [success, setSuccess]   = useState(false);

  const strength = useMemo(() => getStrength(formData.password), [formData.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      await api.post("/auth/register", formData);
      setSuccess(true);
      setTimeout(() => router.push("/login"), 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
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
            Create your account
          </h1>
          <p className="auth-sub text-sm mt-1 text-center">
            Join RepoPilot and start exploring repos smarter
          </p>
        </div>

        {/* GitHub OAuth */}
        <button className="auth-oauth-btn mb-5">
          <FaGithub size={17} />
          Continue with GitHub
        </button>

        {/* Divider */}
        <div className="relative flex items-center mb-5">
          <div className="flex-1 border-t auth-separator" />
          <span className="auth-separator-text">or register with email</span>
          <div className="flex-1 border-t auth-separator" />
        </div>

        {/* Alerts */}
        {error && (
          <div className="auth-alert auth-alert-error mb-5">
            <AlertCircle size={15} className="flex-shrink-0" />
            {error}
          </div>
        )}
        {success && (
          <div className="auth-alert auth-alert-success mb-5">
            <CheckCircle2 size={15} className="flex-shrink-0" />
            Account created! Redirecting to login…
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="auth-label block mb-1.5">Full name</label>
            <div className="auth-input-wrap">
              <User size={15} className="auth-input-icon" />
              <input
                type="text"
                name="name"
                placeholder="Jane Doe"
                value={formData.name}
                onChange={handleChange}
                className="auth-input"
                required
                autoComplete="name"
              />
            </div>
          </div>

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
            <label className="auth-label block mb-1.5">Password</label>
            <div className="auth-input-wrap">
              <Lock size={15} className="auth-input-icon" />
              <input
                type={showPwd ? "text" : "password"}
                name="password"
                placeholder="Minimum 8 characters"
                value={formData.password}
                onChange={handleChange}
                className="auth-input pr-10"
                required
                minLength={8}
                autoComplete="new-password"
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

            {/* Strength meter */}
            {formData.password.length > 0 && (
              <div className="mt-2">
                <div className="auth-strength-bar">
                  <div
                    className="auth-strength-fill"
                    style={{
                      width: `${(strength.score / 4) * 100}%`,
                      background: strength.color,
                    }}
                  />
                </div>
                <p className="text-xs mt-1.5" style={{ color: strength.color }}>
                  {strength.label} password
                </p>
              </div>
            )}
          </div>

          {/* Terms */}
          <p className="text-xs leading-relaxed" style={{ color: "var(--auth-sub)" }}>
            By creating an account you agree to our{" "}
            <Link href="/terms" className="auth-link">Terms of Service</Link>{" "}
            and{" "}
            <Link href="/privacy" className="auth-link">Privacy Policy</Link>.
          </p>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || success}
            className="auth-submit-btn"
          >
            {loading ? (
              <>
                <span className="auth-spinner" />
                Creating account…
              </>
            ) : (
              <>
                <UserPlus size={16} />
                Create account
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="auth-sub text-sm text-center mt-6">
          Already have an account?{" "}
          <Link href="/login" className="auth-link">
            Sign in
          </Link>
        </p>

        <p className="text-center mt-6 text-xs" style={{ color: "var(--auth-sub)", opacity: 0.5 }}>
          Secured by RepoPilot · AI-powered open source tools
        </p>
      </div>
    </div>
  );
}