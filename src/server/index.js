import cors from 'cors';
import 'dotenv/config.js'; // Load environment variables
import express from 'express';
import { capturePayment, createOrder } from './paypal-api.js';

const { PORT = 8888 } = process.env;
const app = express();

app.use(cors());
app.use(express.json());

app.post('/my-server/create-paypal-order', async (req, res) => {
  try {
    const order = await createOrder(req.body);
    res.json(order);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/my-server/capture-paypal-order', async (req, res) => {
  const { orderID } = req.body;
  try {
    const captureData = await capturePayment(orderID);
    res.json(captureData);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}/`);
});
