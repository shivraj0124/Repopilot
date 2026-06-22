"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

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
    <div className="min-h-screen flex items-center justify-center">
      Signing you in...
    </div>
  );
}