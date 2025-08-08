


import React, { useContext, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-hot-toast";
import useAxios from "./hook/useAxios";
import { AuthContext } from "./context/AuthContext";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxios();
  const { user, setUser } = useContext(AuthContext);
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const amount = 10;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    // 🔐 STEP 1: Check if user is already a Gold Member
    try {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      if (res.data?.badge === "Gold") {
        toast.success("🎉 You're already a Gold Member! No payment needed.");
        return;
      }
    } catch (err) {
      console.error("User check error:", err);
      toast.error("Could not verify membership status.");
      return;
    }

    // 🔄 STEP 2: Start payment process
    setProcessing(true);

    try {
      const { data } = await axiosSecure.post("/create-payment-intent", {
        amount: amount * 100,
      });

      const clientSecret = data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user?.displayName || "Guest",
            email: user?.email || "anonymous@example.com",
          },
        },
      });

      if (result.error) {
        toast.error(result.error.message);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        setPaymentSuccess(true);
        toast.success("🎉 Payment successful! You're now a Gold Member!");

        // 🎖 STEP 3: Upgrade user in DB
        const patchRes = await axiosSecure.patch(`/users/${user.email}`);
        if (patchRes.data.modifiedCount > 0) {
          const updatedUser = await axiosSecure.get(`/users/${user.email}`);
          setUser(updatedUser.data);
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Payment failed. Try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 shadow rounded bg-white"
    >
      <h3 className="text-xl mb-4 font-semibold text-center">
        Become a Member - $10
      </h3>

      {paymentSuccess && (
        <div className="mb-4 text-green-600 font-medium text-center">
          ✅ Payment completed successfully!
        </div>
      )}

      <CardElement className="border p-3 rounded mb-6" />

      <button
        disabled={!stripe || processing || paymentSuccess}
        className={`btn btn-primary w-full ${
          paymentSuccess ? "btn-disabled" : ""
        }`}
      >
        {processing
          ? "Processing..."
          : paymentSuccess
          ? "Payment Completed"
          : "Pay $10"}
      </button>
    </form>
  );
};

export default PaymentForm;
