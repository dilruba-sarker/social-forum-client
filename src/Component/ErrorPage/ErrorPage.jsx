import React from "react";
import Lottie from "lottie-react";
import errorAnimation from "../../assets/404.json"; // ✅ use a valid name

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-96">
        <Lottie animationData={errorAnimation} loop={true} />
      </div>
      <h1 className="text-3xl font-bold text-red-500 mt-4">Page Not Found</h1>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        Sorry, the page you are looking for doesn’t exist.
      </p>
      <a
        href="/"
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Back to Home
      </a>
    </div>
  );
}
