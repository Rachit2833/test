const mongoose  = require("mongoose")
const { Schema, model } = mongoose;
const TransactionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Linked to User
  date: { type: Date, required: true },
  category: { type: String, required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Transaction = model("Transaction", TransactionSchema, "Transaction");

module.exports = { Transaction };
