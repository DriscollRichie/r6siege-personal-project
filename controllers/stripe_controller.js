require("dotenv").config();

var stripe = require("stripe")(process.env.SECRET_KEY_STRIPE);

module.exports = {
  payment: (req, res, next) => {
    const charge = stripe.charges.create(
      {
        amount: req.body.amount,
        currency: "usd",
        source: req.body.token.id,
        description: "Test charge from r6Siege App"
      },
      function(err, charge) {
        if (err) {
          return res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      }
    );
  }
};
