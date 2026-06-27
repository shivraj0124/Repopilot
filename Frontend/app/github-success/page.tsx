"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { FaGithub } from "react-icons/fa";
import "@/styles/dashboard.css";

export default function GitHubSuccessPage() {
  const router = useRouter();
  const { refreshUser } = useAuth();

  useEffect(() => {
    const init = async () => {
      await refreshUser();
      router.replace("/dashboard");
    };
    init();
  }, []);

  return (
    <div
      className="rp-page min-h-screen flex flex-col items-center justify-center px-6 text-center"
    >
      <div className="rp-grid-bg" aria-hidden="true">
        <div className="rp-grid-lines" />
        <div className="rp-radial-fade" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
   
        <div className="relative flex items-center justify-center">
     
          <svg
            className="absolute w-20 h-20 animate-spin"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ animationDuration: "1.4s" }}
          >
            <circle
              cx="40" cy="40" r="36"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="56 170"
              style={{ color: "var(--blue)" }}
            />
          </svg>

       
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
            style={{
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              boxShadow: "0 8px 28px rgba(37,99,235,0.4)",
            }}
          >
            <FaGithub className="text-white text-2xl" />
          </div>
        </div>

        
        <div>
          <h1
            className="text-xl sm:text-2xl font-bold tracking-tight"
            style={{ color: "var(--heading)" }}
          >
            Signing you in
          </h1>
          <p
            className="text-sm mt-2"
            style={{ color: "var(--text-muted)" }}
          >
            Connecting with GitHub, redirecting to your dashboard…
          </p>
        </div>

   
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: "var(--blue)",
                animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40%            { transform: scale(1);   opacity: 1;   }
        }
      `}</style>
    </div>
  );
}