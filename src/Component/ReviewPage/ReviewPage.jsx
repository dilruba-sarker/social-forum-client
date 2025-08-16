import React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "John Doe",
    role: "Community Member",
    review:
      "This social forum is amazing! I’ve connected with so many like-minded people. The interface is clean and easy to use.",
  },
  {
    name: "Sarah Lee",
    role: "Student",
    review:
      "I love how smooth everything works. Posting and engaging in discussions feels natural. Definitely recommend!",
  },
  {
    name: "Michael Smith",
    role: "Developer",
    review:
      "One of the best forums I’ve ever used. The speed, design, and features are top-notch. Keep up the great work!",
  },
  {
    name: "Aisha Khan",
    role: "Designer",
    review:
      "Beautiful UI and super friendly community. I find useful threads every day!",
  },
  {
    name: "David Park",
    role: "Moderator",
    review:
      "Spam handling and moderation tools are excellent. Makes community care easy.",
  },
  {
    name: "Priya Patel",
    role: "Content Creator",
    review:
      "Posting, tagging, and searching are all buttery smooth. Big fan!",
  },
];

const Stars = () => (
  <div className="flex items-center gap-1 mb-4" aria-label="Rated 5 out of 5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
    ))}
  </div>
);

const ReviewCard = ({ item }) => (
  <div className="w-[300px] md:w-[360px] bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
    <p className="text-gray-700 mb-4 italic">"{item.review}"</p>
    <Stars />
    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
    <span className="text-sm text-gray-500">{item.role}</span>
  </div>
);

const Row = ({ items, prefix }) => (
  <div className="flex gap-6 shrink-0">
    {items.map((item, idx) => (
      <ReviewCard key={`${prefix}-${idx}`} item={item} />
    ))}
  </div>
);

const ReviewPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-20">
      <h1 className="text-3xl font-bold  text-gray-800 mb-10">
        What People Say About Us ⭐
      </h1>

      {/* Marquee container */}
      <div className="relative overflow-hidden">
        {/* Track: duplicate content twice, then move the track by -50% forever */}
        <motion.div
          className="flex gap-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity }}
          style={{ willChange: "transform" }}
        >
          <Row items={reviews} prefix="a" />
          <Row items={reviews} prefix="b" />
        </motion.div>

        {/* Soft fade edges (optional) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-gray-50 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-gray-50 to-transparent" />
      </div>
    </div>
  );
};

export default ReviewPage;
