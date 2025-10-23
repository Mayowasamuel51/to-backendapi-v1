import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  userEmail: String,
  amount: Number,
  currency: String,
  courseName:String, 
  paymentStatus: String,
  paymentId: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Payment", PaymentSchema);
