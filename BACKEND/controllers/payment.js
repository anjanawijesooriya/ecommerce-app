const stripe = require("stripe")(process.env.STRIPE_KEY);

exports.createPayment = async (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json({ message: "Payment failed", error: stripeErr });
      } else {
        res
          .status(200)
          .json({ message: "Payment successful", data: stripeRes });
      }
    }
  );
};
