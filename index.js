const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
const app = express();


const stripe = Stripe('sk_test_51PvZooRpHMOyTpgDXWH3qooQAgCsldakvV9SqvLe35xLE88UIlsK4nAPmkEqSRx83hMtwqhxrcMkjFo5t5u8MmWM00yZ6nQv66');

app.use(express.json());
app.use(cors());

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',  
      payment_method_types: ['card'],
    });

    res.json(paymentIntent.client_secret);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
