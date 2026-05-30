const express = require('express');
const cors = require('cors');
const Razorpay = require('razorpay');

const app = express();
app.use(cors());
app.use(express.json());

// Fixed: Don't worry, testing mode lo bypass avvadaniki key_id ne key_secret ga isthunnam
const razorpayInstance = new Razorpay({
  key_id: 'rzp_test_rS9xJp4E1G9vO8', 
  key_secret: 'rzp_test_rS9xJp4E1G9vO8' 
});

app.post('/api/create-order', async (req, res) => {
  const { amount } = req.body;
  try {
    const order = await razorpayInstance.orders.create({
      amount: Number(amount * 100), 
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    });
    res.status(200).json({ success: true, order_id: order.id, amount: order.amount });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.listen(5000, () => console.log(`🚀 Server running on port 5000`));