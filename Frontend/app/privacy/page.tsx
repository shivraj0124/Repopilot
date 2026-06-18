"use client";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold mb-8">
          Privacy Policy
        </h1>

        <div className="dash-card p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Information We Collect
            </h2>

            <p className="text-zinc-400">
              RepoPilot may collect account information such
              as your name, email address, and repository
              analysis history.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              How We Use Information
            </h2>

            <p className="text-zinc-400">
              We use collected information to provide AI
              repository analysis, improve our platform, and
              enhance user experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Data Security
            </h2>

            <p className="text-zinc-400">
              We take reasonable measures to protect user
              data and authentication credentials.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Third-Party Services
            </h2>

            <p className="text-zinc-400">
              RepoPilot integrates with GitHub APIs and AI
              services such as Gemini for repository and
              issue analysis.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Contact
            </h2>

            <p className="text-zinc-400">
              If you have questions regarding privacy,
              contact us at support@repopilot.dev.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}