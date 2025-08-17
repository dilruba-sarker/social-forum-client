import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_6vcsd9s",   // ✅ Your EmailJS Service ID
        "template_5cg42vs", // ✅ Your EmailJS Template ID
        form.current,
        "2zV2EqniGC4wZY_xQ" // ✅ Your EmailJS Public Key
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("✅ Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
          alert("❌ Failed to send message. Try again.");
        }
      );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Have questions or feedback? We’d love to hear from you. Fill out the form
            or reach us through the information below.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Side - Contact Info */}
          <div className="space-y-6 bg-gray-800/50 p-6 rounded-2xl shadow-lg border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>

            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-indigo-400 text-xl" />
              <p>support@forum.com</p>
            </div>
            <div className="flex items-center space-x-3">
              <FaPhoneAlt className="text-indigo-400 text-xl" />
              <p>+880 1234 567 890</p>
            </div>
            <div className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-indigo-400 text-xl" />
              <p>Dhaka, Bangladesh</p>
            </div>

            {/* Social Media */}
            <div className="flex space-x-5 mt-6">
              <a href="https://www.facebook.com/Dilruba9S" target="_blank" rel="noreferrer">
                <FaFacebook className="text-2xl hover:text-blue-500 transition" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <FaTwitter className="text-2xl hover:text-sky-400 transition" />
              </a>
              <a href="https://www.linkedin.com/in/dilruba-sarker-x20/" target="_blank" rel="noreferrer">
                <FaLinkedin className="text-2xl hover:text-blue-600 transition" />
              </a>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-gray-800/50 p-6 rounded-2xl shadow-lg border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
            <form ref={form} onSubmit={sendEmail} className="space-y-5">
              <div>
                <label className="block mb-2 text-gray-300">Name</label>
                <input
                  type="text"
                  name="user_name"
                  placeholder="Enter your name"
                  className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-300">Email</label>
                <input
                  type="email"
                  name="user_email"
                  placeholder="Enter your email"
                  className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-300">Message</label>
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Write your message..."
                  className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition font-semibold"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
