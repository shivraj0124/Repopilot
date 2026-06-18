"use client";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold mb-6">
          Contact Us
        </h1>

        <p className="text-zinc-400 text-lg">
          Have feedback, suggestions, or questions about
          RepoPilot? We'd love to hear from you.
        </p>

        <div className="dash-card p-8 mt-10">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">
                Email
              </h3>

              <p className="text-zinc-400">
                shivrajkolwankar@gmail.com
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">
                GitHub
              </h3>

              <p className="text-zinc-400">
                github.com/repopilot
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">
                Response Time
              </h3>

              <p className="text-zinc-400">
                Usually within 24-48 hours.
              </p>
            </div>
          </div>
        </div>

        <div className="dash-card p-8 mt-8">
          <h2 className="text-2xl font-bold mb-5">
            Send a Message
          </h2>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800"
            />

            <textarea
              rows={5}
              placeholder="Your Message"
              className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800"
            />

            <button
              type="submit"
              className="explore-btn-primary"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}