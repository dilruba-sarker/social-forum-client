import React from "react";
import { Crown, Users, Ticket, Award, LifeBuoy, ShieldCheck, Palette, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Premium Membership",
    icon: <Crown className="w-10 h-10 text-yellow-500" />,
    description: "Access exclusive threads, ad-free browsing, and special badges.",
  },
  {
    title: "Community Discussions",
    icon: <Users className="w-10 h-10 text-indigo-500" />,
    description: "Engage in lively discussions, ask questions, and share knowledge.",
  },
  {
    title: "Events & Meetups",
    icon: <Ticket className="w-10 h-10 text-green-500" />,
    description: "Attend online and offline community events and networking sessions.",
  },
  {
    title: "Badges & Recognition",
    icon: <Award className="w-10 h-10 text-pink-500" />,
    description: "Earn badges and recognition for your contributions to the forum.",
  },
  {
    title: "Support & Resources",
    icon: <LifeBuoy className="w-10 h-10 text-blue-500" />,
    description: "Get help from the community and access valuable learning resources.",
  },
  {
    title: "Content Moderation",
    icon: <ShieldCheck className="w-10 h-10 text-red-500" />,
    description: "Ensuring a safe and healthy environment for all members.",
  },
  {
    title: "Custom Profile Themes",
    icon: <Palette className="w-10 h-10 text-purple-500" />,
    description: "Personalize your forum profile with themes and colors.",
  },
  {
    title: "Learning & Tutorials",
    icon: <BookOpen className="w-10 h-10 text-teal-500" />,
    description: "Access guides, tutorials, and tips to make the most of the forum.",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 md:px-20">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-12">
        🚀 Our Services
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col items-center text-center transition"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="mb-4">{service.icon}</div>
            <h2 className="text-xl font-semibold text-gray-900">{service.title}</h2>
            <p className="text-gray-600 mt-2">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;
