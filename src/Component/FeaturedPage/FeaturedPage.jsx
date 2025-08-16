import React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const featuredItems = [
  {
    title: "Trending Discussions",
    description: "Check out the hottest topics people are engaging in right now.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Top Contributors",
    description:
      "Meet our most active community members who make the forum lively.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "New Features",
    description:
      "Explore the latest tools and features added to make your experience better.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Community Events",
    description:
      "Join virtual meetups, workshops, and live discussions happening this month.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop",
  },
];

const FeaturedPage = () => {
  return (
    <div className="bg-gray-50 mt- mb-12 px-12 py-6 md:px-20">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-12">
        🌟 Featured Highlights
      </h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
        {featuredItems.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: index * 0.3 }}
            viewport={{ once: true }}
          >
            <div className="h-24 w-full overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="py-2 px-2">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {item.title}
              </h2>
              <p className="text-gray-600 mb-4">{item.description}</p>
              
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedPage;
