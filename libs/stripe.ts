import Stripe from "stripe";

const apiKey = process.env.STRIPE_SECRET_KEY!;

export const stripe = new Stripe(apiKey, {
  apiVersion: "2023-10-16",
  appInfo: {
    name: "Spotify Clone",
    version: "0.1.0",
  },
});
