"use client";

import { useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import { Mail, Clock, Send, CheckCircle2, MessageCircle } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import "@/styles/dashboard.css";

function GridBackground() {
  return (
    <div className="rp-grid-bg" aria-hidden="true">
      <div className="rp-grid-lines" />
      <div className="rp-radial-fade" />
    </div>
  );
}

const CONTACT_DETAILS = [
  { icon: Mail, label: "Email", value: "shivrajkolwankar@gmail.com" },
  { icon: FaGithub, label: "GitHub", value: "github.com/repopilot" },
  { icon: Clock, label: "Response Time", value: "Usually within 24–48 hours" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="rp-page">
      <Navbar />

      <section className="relative">
        <GridBackground />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 z-10">

          <div className="dash-eyebrow mb-5">
            <MessageCircle size={11} />
            Get in Touch
          </div>
          <h1 className="static-page-title">Contact Us</h1>
          <p className="static-page-lead mt-5">
            Have feedback, suggestions, or questions about RepoPilot? We'd love to hear from you.
          </p>

          <div className="dash-card p-6 sm:p-8 mt-10">
            <div className="grid sm:grid-cols-3 gap-6">
              {CONTACT_DETAILS.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="static-field-icon">
                    <Icon size={15} />
                  </div>
                  <div className="min-w-0">
                    <p className="static-field-label">{label}</p>
                    <p className="static-field-value break-words">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

         
          <div className="dash-card p-6 sm:p-8 mt-6">
            <h2 className="static-section-title mb-6">Send a Message</h2>

            {submitted && (
              <div className="static-success-banner mb-5">
                <CheckCircle2 size={16} />
                Message sent! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="static-input"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                className="static-input"
              />

              <textarea
                name="message"
                rows={5}
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
                className="static-textarea"
              />

              <button type="submit" disabled={submitting} className="explore-btn-primary !w-auto disabled:opacity-60">
                {submitting ? (
                  "Sending…"
                ) : (
                  <>
                    <Send size={14} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}