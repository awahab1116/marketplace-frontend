// src/App.tsx
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import AppRouter from "./router/index";

// Replace 'your_stripe_public_key' with your actual Stripe public key
const stripePromise = loadStripe(
  "pk_test_51OURs9HQYjcX108KGMDmo6Dbb214m2Ab5kOoFoT6em1ZE8eZcjV60f9VRR5M12ilNnbCUdZp9Cg8KRnUKK4xwLg800ukim89C7"
);
console.log(process.env.REACT_STRIPE_PUBLIC_KEY);
const App: React.FC = () => {
  return (
    <div className="App">
      <Elements stripe={stripePromise}>
        <AppRouter />
      </Elements>
    </div>
  );
};

export default App;
