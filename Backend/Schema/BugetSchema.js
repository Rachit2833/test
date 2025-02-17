const mongoose  = require("mongoose")
const { Schema, model } = mongoose;


const BudgetSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Linked to User
  month: { type: Number, required: true, min: 1, max: 12 }, // 1-12 (Jan-Dec)
  year: { type: Number, required: true }, // e.g., 2025
  totalBudget: { type: Number, required: true }, // Total budget for that month
  categories: [
    {
      name: { type: String, required: true },
      amount: { type: Number, required: true }, // Budget allocated for each category
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Budget = model("Budget", BudgetSchema,"Budget");
module.exports= {  Budget  };
