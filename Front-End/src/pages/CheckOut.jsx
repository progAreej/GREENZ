import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, CreditCard, Truck } from 'lucide-react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js'; // For Stripe integration

const stripePromise = loadStripe('pk_test_51PnmyzLnJej27waJMLMa1v5bytDTIMqPrzKtmEsLslorjlsqAe7WKblwcWJ8ZKyKcixgSPtuPQVp5nW9tRTt44s400crytM4qt'); // Replace with your Stripe public key

const CheckoutPage = () => {
  const orderItems = [
    { id: 1, name: 'Green Smoothie Bowl', price: 12.99, quantity: 2 },
    { id: 2, name: 'Avocado Toast', price: 9.99, quantity: 1 },
    { id: 3, name: 'Quinoa Salad', price: 11.99, quantity: 1 },
  ];

  const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // Assuming 8% tax
  const total = subtotal + tax;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'stripe', // Default to Stripe
    amount: total, // Set the amount to total
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const [paypalLoaded, setPaypalLoaded] = useState(false);

  useEffect(() => {
    // Load PayPal script when payment method is PayPal
    if (formData.paymentMethod === 'paypal' && !paypalLoaded) {
      const script = document.createElement('script');
      script.src = "https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID"; // Replace with your PayPal client ID
      script.addEventListener('load', () => setPaypalLoaded(true));
      document.body.appendChild(script);
    }
  }, [formData.paymentMethod, paypalLoaded]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleStripePayment = async () => {
    const stripe = await stripePromise;

    // Create a Stripe payment method or token
    const {token, error} = await stripe.createToken({
      number: formData.cardNumber,
      exp_month: formData.expiryDate.split('/')[0],
      exp_year: formData.expiryDate.split('/')[1],
      cvc: formData.cvv,
    });

    if (error) {
      console.error('Stripe payment error', error);
      return;
    }

    // Send token to your backend for payment processing
    try {
      const response = await axios.post('http://localhost:5000/api/payments/stripe/checkout', {
        amount: formData.amount,
        token: token.id // Send the token ID to your backend
      });
      console.log('Stripe payment successful', response.data);
    } catch (error) {
      console.error('Error processing Stripe payment', error);
    }
  };

  const handlePayPalPayment = async () => {
    // Handle PayPal payment via the PayPal button
    console.log('PayPal payment initiated');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.paymentMethod === 'stripe') {
      await handleStripePayment();
    } else if (formData.paymentMethod === 'paypal') {
      // PayPal payment is handled by PayPal Buttons
      handlePayPalPayment();
    }
  };

  useEffect(() => {
    if (paypalLoaded && formData.paymentMethod === 'paypal') {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                currency_code: 'USD',
                value: formData.amount.toFixed(2) // Use the amount from formData
              }
            }]
          });
        },
        onApprove: async (data, actions) => {
          await actions.order.capture();
          console.log('PayPal payment successful');
          // Optionally notify your backend about the successful payment
          try {
            await axios.post('http://localhost:5000/api/payments/paypal/success', {
              paymentId: data.orderID,
              PayerID: data.payerID,
              amount: formData.amount
            });
          } catch (error) {
            console.error('Error processing PayPal payment', error);
          }
        },
        onError: (err) => {
          console.error('PayPal payment error', err);
        }
      }).render('#paypal-button-container');
    }
  }, [paypalLoaded, formData.paymentMethod]);

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">Checkout</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <ShoppingCart className="mr-2 text-green-600" />
              Order Summary
            </h2>
            {orderItems.map(item => (
              <div key={item.id} className="flex justify-between items-center mb-2">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center font-semibold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>

          {/* Checkout Form */}
          <motion.form 
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Truck className="mr-2 text-green-600" />
              Shipping Information
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-4"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-4"
              required
            />
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="zipCode"
                placeholder="ZIP Code"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Payment Method
              </label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="stripe">Credit Card (Stripe)</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>

            {formData.paymentMethod === 'stripe' && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Credit Card Information</h3>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded mb-4"
                  required
                />
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>
            )}

            {formData.paymentMethod === 'paypal' && (
              <div id="paypal-button-container" className="mb-4"></div>
            )}

            <button
              type="submit"
              className="bg-green text-white py-2 px-4 rounded"
            >
              Pay ${total.toFixed(2)}
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
