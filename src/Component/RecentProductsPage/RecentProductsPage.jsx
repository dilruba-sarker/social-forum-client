import React from "react";
import { Star, Users, Ticket, Crown } from "lucide-react";
import { motion } from "framer-motion";

const products = [
  {
    name: "Premium Membership",
    price: "$10 / month",
    rating: 5,
    icon: <Crown className="w-10 h-10 text-yellow-500" />,
    description: "Unlock exclusive threads, badges, and an ad-free experience.",
  },
  {
    name: "Community Badge Pack",
    price: "$5",
    rating: 4,
    icon: <Users className="w-10 h-10 text-indigo-500" />,
    description: "Collect and show off unique badges on your forum profile.",
  },
  {
    name: "Forum Event Ticket",
    price: "$20",
    rating: 5,
    icon: <Ticket className="w-10 h-10 text-green-500" />,
    description: "Attend exclusive virtual or local meetups with members.",
  },
];

const RecentProductsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 md:px-20">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
        🛍 Recent Community Products
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col items-center transition"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            {/* Icon at top */}
            <div className="mb-4">{product.icon}</div>

            {/* Content */}
            <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
            <p className="text-gray-500">{product.price}</p>
            <p className="text-sm text-gray-600 mt-2 text-center">{product.description}</p>

            {/* Rating */}
            <div className="flex items-center mt-3">
              {[...Array(product.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentProductsPage;
