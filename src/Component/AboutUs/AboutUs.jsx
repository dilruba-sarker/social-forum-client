import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-12 px-6 md:px-20">
      {/* Title */}
      <motion.h1
        className="text-4xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        About Us
      </motion.h1>

      {/* Intro */}
      <motion.p
        className="text-center text-lg max-w-3xl mx-auto mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
      >
        Welcome to <span className="font-semibold">Our Forum</span> – a place
        where ideas meet, communities grow, and discussions thrive.  
        Our mission is to create a safe and engaging platform for everyone to
        share knowledge, seek support, and connect with like-minded people.
      </motion.p>

      {/* Mission & Vision */}
      <div className="grid gap-10 md:grid-cols-2">
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
            Our Mission
          </h2>
          <p>
            To empower people by providing a platform where voices are heard,
            knowledge is shared, and communities are built on trust and respect.
          </p>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-green-600 dark:text-green-400">
            Our Vision
          </h2>
          <p>
            To become the most trusted online community platform that brings
            people together across the globe, promoting positivity, creativity,
            and collaboration.
          </p>
        </motion.div>
      </div>

      {/* Team Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-10">Meet Our Team</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Sarah Johnson",
              role: "Founder & CEO",
              img: "https://randomuser.me/api/portraits/women/68.jpg",
            },
            {
              name: "Michael Smith",
              role: "Community Manager",
              img: "https://randomuser.me/api/portraits/men/45.jpg",
            },
            {
              name: "Emily Davis",
              role: "Lead Developer",
              img: "https://randomuser.me/api/portraits/women/32.jpg",
            },
          ].map((member, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              viewport={{ once: true }}
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-blue-400"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
