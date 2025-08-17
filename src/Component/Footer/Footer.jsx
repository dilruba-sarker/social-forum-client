import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import logo from '../../assets/Untitled (150 x 150 px) (5).png'
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo + About */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img
              src={logo}
              alt="Social Forum Logo"
              className="w-10 h-10 rounded-full object-cover"
            />
            <h2 className="text-2xl font-bold">Social Forum</h2>
          </div>
          <p className="text-sm text-gray-400">
            A modern place to discuss, share, and grow. Join the conversation and connect with like-minded people around the world.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="/about" className="hover:text-white transition">About Us</a></li>
            <li><a href="/membership" className="hover:text-white transition">Membership</a></li>
            <li><a href="/policy" className="hover:text-white transition"> Privecy Policy</a></li>
            <li><a href="/contract" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>Email: support@socialforum.com</li>
            <li>Phone: +880 1234 567890</li>
            <li>Address: Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300 transition"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 text-center text-sm text-gray-500 py-4">
        Copyright © 2025 - All rights reserved by <span className="text-white font-medium">Social Forum</span>
      </div>
    </footer>
  );
};

export default Footer;
