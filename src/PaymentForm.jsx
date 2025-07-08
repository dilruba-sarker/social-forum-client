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
  const amount = 10;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    try {
      // 1. Create Payment Intent
      const { data } = await axiosSecure.post("/create-payment-intent", {
        amount: amount * 100,
      });

      const clientSecret = data.clientSecret;

      // 2. Confirm Card Payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
        setProcessing(false);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        // 3. Update user role to 'member' in DB
        const res = await axiosSecure.patch(`/users/${user.email}`);
        if (res.data.modifiedCount > 0) {
          toast.success("You're now a Gold Member!");

          // 4. Optionally refresh local user
          const updatedUser = await axiosSecure.get(`/users/${user.email}`);
          setUser(updatedUser.data); // 👈 Updates the local user state
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Payment failed");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 shadow rounded">
      <h3 className="text-xl mb-4 font-semibold">Become a Member - $10</h3>
      <CardElement className="border p-3 rounded mb-6" />
      <button disabled={!stripe || processing} className="btn btn-primary w-full">
        {processing ? "Processing..." : "Pay $10"}
      </button>
    </form>
  );
};

export default PaymentForm;
