import React from "react";
// If you don't use framer-motion, remove the imports and <motion.*> wrappers.
import { motion } from "framer-motion";

const updatedOn = "August 17, 2025"; // set this to your actual last-updated date

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "data-we-collect", title: "Information We Collect" },
  { id: "how-we-use", title: "How We Use Your Information" },
  { id: "legal-basis", title: "Legal Basis (GDPR/EU)" },
  { id: "cookies", title: "Cookies & Tracking" },
  { id: "sharing", title: "How We Share Information" },
  { id: "retention", title: "Data Retention" },
  { id: "your-rights", title: "Your Rights" },
  { id: "security", title: "Security" },
  { id: "children", title: "Children’s Privacy" },
  { id: "changes", title: "Changes to This Policy" },
  { id: "contact", title: "Contact Us" },
];

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div
          className="h-56 md:h-64 w-full flex items-center justify-center text-center px-6"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(2,6,23,0.7))",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">
              Privacy Policy
            </h1>
            <p className="mt-3 text-slate-200">
              Your privacy matters. This page explains what we collect, why we
              collect it, and how you can control your data on our forum.
            </p>
            <p className="mt-2 text-xs text-slate-300">
              Last updated: {updatedOn}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content + TOC */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 md:px-10 py-10">
        {/* TOC (sticky on large screens) */}
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-6">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wide">
                Contents
              </h2>
              <nav className="mt-3 space-y-2">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    • {s.title}
                  </a>
                ))}
              </nav>
            </div>

            {/* Mobile quick jump */}
            <details className="mt-4 lg:hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
              <summary className="cursor-pointer text-sm font-semibold text-gray-700 dark:text-gray-200">
                Jump to section
              </summary>
              <div className="mt-3 space-y-2">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    • {s.title}
                  </a>
                ))}
              </div>
            </details>
          </div>
        </aside>

        {/* Main content */}
        <main className="lg:col-span-9">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-10"
          >
            {/* Intro */}
            <section
              id="introduction"
              className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
            >
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
                Introduction
              </h2>
              <p className="mt-3 text-gray-700 dark:text-gray-300">
                This Privacy Policy describes how <strong>Your Forum Name</strong> (“we,” “us,” or “our”)
                collects, uses, discloses, and protects your information when
                you use our website, mobile site, and related services
                (collectively, the “Service”). By using the Service, you agree
                to this Policy. If you do not agree, please discontinue use.
              </p>
              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                This page is for general information and does not constitute
                legal advice.
              </p>
            </section>

            {/* Data we collect */}
            <section
              id="data-we-collect"
              className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
            >
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
                Information We Collect
              </h2>
              <ul className="mt-4 list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Account Info:</strong> username, email, password
                  (hashed), profile details (bio, avatar, badges).
                </li>
                <li>
                  <strong>Content:</strong> posts, comments, likes, messages,
                  attachments you upload or share.
                </li>
                <li>
                  <strong>Usage Data:</strong> pages viewed, features used,
                  referral URLs, timestamps, crash logs.
                </li>
                <li>
                  <strong>Device/Technical:</strong> IP address, browser type,
                  device type, operating system.
                </li>
                <li>
                  <strong>Optional/Consent-based:</strong> location or
                  contacts—only if you grant permission.
                </li>
              </ul>
            </section>

            {/* How we use */}
            <section
              id="how-we-use"
              className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
            >
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
                How We Use Your Information
              </h2>
              <ul className="mt-4 list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Provide, maintain, and improve the forum experience.</li>
                <li>Moderate content and enforce community guidelines.</li>
                <li>Customize content (e.g., feeds, recommendations).</li>
                <li>Communicate about updates, security, and promotions.</li>
                <li>Analyze usage to improve performance and features.</li>
                <li>Comply with legal obligations and protect our users.</li>
              </ul>
            </section>

            {/* Legal basis */}
            <section
              id="legal-basis"
              className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
            >
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
                Legal Basis for Processing (GDPR/EU)
              </h2>
              <ul className="mt-4 list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Contract:</strong> to operate your account and deliver
                  the Service.
                </li>
                <li>
                  <strong>Legitimate Interests:</strong> to secure, maintain, and
                  improve the forum.
                </li>
                <li>
                  <strong>Consent:</strong> for optional features (e.g., marketing
                  emails, location).
                </li>
                <li>
                  <strong>Legal Obligation:</strong> to comply with applicable
                  laws and requests.
                </li>
              </ul>
            </section>

            {/* Cookies */}
            <section
              id="cookies"
              className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
            >
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
                Cookies & Tracking
              </h2>
              <p className="mt-3 text-gray-700 dark:text-gray-300">
                We use cookies, local storage, and similar technologies to keep
                you signed in, remember preferences, measure performance, and
                personalize content. You can control cookies via your browser
                settings. Some features may not function without them.
              </p>
            </section>

            {/* Sharing */}
            <section
              id="sharing"
              className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
            >
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
                How We Share Information
              </h2>
              <ul className="mt-4 list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Service Providers:</strong> hosting, analytics,
                  customer support—bound by confidentiality.
                </li>
                <li>
                  <strong>Legal/Protection:</strong> to comply with law or
                  protect rights, safety, and security.
                </li>
                <li>
                  <strong>Community Content:</strong> posts/comments are public per
                  your settings.
                </li>
                <li>
                  <strong>Business Transfers:</strong> in connection with a
                  merger, acquisition, or asset sale.
                </li>
              </ul>
            </section>

            {/* Retention */}
            <section
              id="retention"
              className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
            >
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
                Data Retention
              </h2>
              <p className="mt-3 text-gray-700 dark:text-gray-300">
                We retain information as long as necessary to provide the
                Service, comply with legal obligations, resolve disputes, and
                enforce our agreements. You may request deletion—see “Your
                Rights” below.
              </p>
            </section>

            {/* Your rights */}
            <section
              id="your-rights"
              className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
            >
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
                Your Rights
              </h2>
              <ul className="mt-4 list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Access/Correction/Deletion:</strong> request a copy,
                  fix inaccuracies, or delete your data.
                </li>
                <li>
                  <strong>Opt-out:</strong> marketing emails and certain
                  analytics (where applicable).
                </li>
                <li>
                  <strong>GDPR:</strong> restrict/objection, data portability,
                  withdraw consent at any time.
                </li>
                <li>
                  <strong>CCPA/CPRA (California):</strong> know, delete, correct,
                  and opt-out of “sale” or “sharing” of personal info.
                </li>
              </ul>
              <p className="mt-3 text-gray-700 dark:text-gray-300">
                To exercise rights, see “Contact Us” below. We may verify your
                identity before responding.
              </p>
            </section>

            {/* Security */}
            <section
              id="security"
              className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
            >
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
                Security
              </h2>
              <p className="mt-3 text-gray-700 dark:text-gray-300">
                We use administrative, technical, and physical safeguards
                designed to protect information. However, no method of
                transmission or storage is completely secure.
              </p>
            </section>

            {/* Children */}
            <section
              id="children"
              className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
            >
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
                Children’s Privacy
              </h2>
              <p className="mt-3 text-gray-700 dark:text-gray-300">
                Our Service is not directed to children under the age specified
                by applicable law (e.g., 13 or 16). We do not knowingly collect
                personal information from children. If you believe a child has
                provided personal information, contact us to delete it.
              </p>
            </section>

            {/* Changes */}
            <section
              id="changes"
              className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
            >
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
                Changes to This Policy
              </h2>
              <p className="mt-3 text-gray-700 dark:text-gray-300">
                We may update this Policy from time to time. We will post the
                new date above and, when required, notify you via the Service or
                email.
              </p>
            </section>

            {/* Contact */}
            <section
              id="contact"
              className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
            >
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
                Contact Us
              </h2>
              <p className="mt-3 text-gray-700 dark:text-gray-300">
                If you have questions or wish to exercise your privacy rights,
                contact:
              </p>
              <div className="mt-4 rounded-xl border border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900">
                <p className="text-gray-800 dark:text-gray-200">
                  <span className="font-semibold">Privacy Team</span><br />
                  Your Forum Name<br />
                  Email:{" "}
                  <a
                    href="mailto:privacy@yourforum.com"
                    className="text-indigo-600 dark:text-indigo-400 underline"
                  >
                    privacy@yourforum.com
                  </a>
                </p>
              </div>
            </section>

            {/* Back to top */}
          
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
