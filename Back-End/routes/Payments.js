const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const paypal = require('paypal-rest-sdk');
const Stripe = require('stripe');
const Payment = require('../models/Payment'); // Import the Payment model

// PayPal Configuration
paypal.configure({
  mode: 'sandbox', // Change to 'live' for production
  client_id: 'YOUR_PAYPAL_CLIENT_ID',
  client_secret: 'YOUR_PAYPAL_CLIENT_SECRET',
});

// Stripe Configuration
const stripe = Stripe('sk_test_51PnmyzLnJej27waJdWGnldTQXl6Ss06mulsNQhr6q9A0XvEwdDyJa1NZFhPxohmao9DclZbr7sFIdg2vKZXYerb500ciZPAQAX');

// PayPal Routes
router.post('/paypal/checkout', (req, res) => {
  const { amount, userId, chefId } = req.body; // Amount and other details should be sent from the client

  const create_payment_json = {
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: amount,
      },
    }],
    application_context: {
      return_url: 'http://localhost:5000/api/payments/paypal/success',
      cancel_url: 'http://localhost:5000/api/payments/paypal/cancel',
    },
  };

  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
      console.error(error);
      res.status(500).send(error);
    } else {
      res.json(payment);
    }
  });
});

router.get('/paypal/success', async (req, res) => {
  const { paymentId, PayerID, amount, userId, chefId } = req.query;

  const execute_payment_json = {
    payer_id: PayerID,
    transactions: [{
      amount: {
        currency_code: 'USD',
        total: amount,
      },
    }],
  };

  paypal.payment.execute(paymentId, execute_payment_json, async (error, payment) => {
    if (error) {
      console.error(error);
      res.status(500).send(error);
    } else {
      // Save payment details to MongoDB
      try {
        const newPayment = new Payment({
          userId,
          amount: parseFloat(amount),
          method: 'PayPal',
          status: 'completed',
          transactionId: paymentId,
          chefId,
        });
        await newPayment.save();
        res.json(payment);
      } catch (dbError) {
        console.error(dbError);
        res.status(500).send(dbError);
      }
    }
  });
});

router.get('/paypal/cancel', (req, res) => {
  res.send('Payment cancelled.');
});

// Stripe Routes
router.post('/stripe/checkout', async (req, res) => {
  const { amount, token, userId, chefId } = req.body;

  try {
    const charge = await stripe.charges.create({
      amount: amount * 100,
      currency: 'usd',
      description: 'Charge for your order',
      source: token,
    });

    // Save payment details to MongoDB
    const newPayment = new Payment({
      userId,
      amount: parseFloat(amount),
      method: 'Stripe',
      status: 'completed',
      transactionId: charge.id,
      chefId,
    });

    await newPayment.save();

    res.json(charge);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;
