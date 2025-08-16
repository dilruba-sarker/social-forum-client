import React, { useState } from "react";
import { Mail, CheckCircle2, AlertCircle } from "lucide-react";

/**
 * NewsletterSection
 * - Full-width hero with background image + overlay
 * - Glassy signup card with subtle animation and focus states
 * - Accessible labels, aria-live feedback, and simple client-side validation
 *
 * Usage:
 * <NewsletterSection bgImageUrl="/assets/forum-bg.jpg" onSubmitEmail={(payload)=>{...}} />
 * If you don't pass bgImageUrl, a placeholder image will be used.
 */
export default function NewsletterSection({ bgImageUrl, onSubmitEmail }) {
  const [form, setForm] = useState({ name: "", email: "", agree: false, company: "" }); // company is a honeypot
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const image =
    bgImageUrl ||
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic anti-bot: if honeypot filled, silently pass
    if (form.company) return;

    if (!form.name.trim()) {
      setStatus({ state: "error", message: "Please enter your name." });
      return;
    }
    if (!isValidEmail(form.email)) {
      setStatus({ state: "error", message: "Please enter a valid email address." });
      return;
    }
    if (!form.agree) {
      setStatus({ state: "error", message: "Please agree to receive updates." });
      return;
    }

    try {
      setStatus({ state: "loading", message: "Signing you up…" });

      // If you have an API, call it here. Example:
      // await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: form.name, email: form.email }) });

      // For now, simulate request
      await new Promise((res) => setTimeout(res, 900));

      // optional callback for parent integration
      onSubmitEmail?.({ name: form.name, email: form.email, time: new Date().toISOString() });

      setStatus({ state: "success", message: "You're on the list! Check your inbox." });
      setForm({ name: "", email: "", agree: false, company: "" });
    } catch (err) {
      setStatus({ state: "error", message: "Something went wrong. Please try again." });
    }
  };

  return (
    <section
      className="relative w-full min-h-[70vh] mb-12 grid place-items-center overflow-hidden"
      role="region"
      aria-label="Newsletter sign up section"
    >
      {/* Background image */}
      <div
        aria-hidden
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Overlay + gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

      {/* Decorative blurs */}
      <div className="absolute -top-10 -right-10 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />

      {/* Content Card */}
      <div className="relative z-10 mx-4 w-full max-w-3xl">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <div className="w-full">
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Join our community newsletter
              </h2>
              <p className="mt-2 text-white/80">
                Get the latest threads, feature drops, and community highlights from our social forum—straight to your inbox.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Honeypot */}
                <label className="sr-only" htmlFor="company">Company</label>
                <input
                  id="company"
                  name="company"
                  tabIndex="-1"
                  autoComplete="off"
                  className="hidden"
                  value={form.company}
                  onChange={handleChange}
                />

                <div className="sm:col-span-1">
                  <label htmlFor="name" className="block text-sm text-white/90 mb-1">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    className="w-full rounded-xl bg-white/90 focus:bg-white px-4 py-3 text-gray-900 placeholder-gray-500 outline-none ring-2 ring-transparent focus:ring-indigo-400 transition"
                    required
                  />
                </div>

                <div className="sm:col-span-1">
                  <label htmlFor="email" className="block text-sm text-white/90 mb-1">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-xl bg-white/90 focus:bg-white px-4 py-3 text-gray-900 placeholder-gray-500 outline-none ring-2 ring-transparent focus:ring-indigo-400 transition"
                    required
                  />
                </div>

                <div className="sm:col-span-1 flex items-end">
                  <button
                    type="submit"
                    disabled={status.state === "loading"}
                    className="w-full rounded-xl px-5 py-3 font-semibold shadow-lg bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-black/20 disabled:opacity-70 disabled:cursor-not-allowed"
                    aria-busy={status.state === "loading"}
                  >
                    {status.state === "loading" ? "Subscribing…" : "Subscribe"}
                  </button>
                </div>

                <div className="sm:col-span-3 mt-2 flex items-start gap-2">
                  <input
                    id="agree"
                    name="agree"
                    type="checkbox"
                    checked={form.agree}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-white/40 bg-white/70 text-indigo-600 focus:ring-indigo-400"
                  />
                  <label htmlFor="agree" className="text-white/80 text-sm">
                    I agree to receive email updates and understand I can unsubscribe anytime.
                  </label>
                </div>

                {/* Status message */}
                <div className="sm:col-span-3 mt-3" aria-live="polite">
                  {status.state === "success" && (
                    <p className="flex items-center gap-2 text-emerald-200">
                      <CheckCircle2 className="h-5 w-5" /> {status.message}
                    </p>
                  )}
                  {status.state === "error" && (
                    <p className="flex items-center gap-2 text-rose-200">
                      <AlertCircle className="h-5 w-5" /> {status.message}
                    </p>
                  )}
                </div>
              </form>

              {/* Trust badges */}
              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-white/70">
                <span className="px-2 py-1 rounded-full bg-white/10 border border-white/20">No spam, ever</span>
                <span className="px-2 py-1 rounded-full bg-white/10 border border-white/20">1-click unsubscribe</span>
                <span className="px-2 py-1 rounded-full bg-white/10 border border-white/20">Weekly highlights</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
