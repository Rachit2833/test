const express= require("express")
const dotenv= require("dotenv");
const mongoose  = require("mongoose");
const { Budget } = require("./Schema/BugetSchema");
const { Transaction } = require("./Schema/TransctionSchema");
dotenv.config({ path: "./config.env" });
const app = express()
const PORT = process.env.PORT || 3000; // Default to port 3000 if not defined
const DB = process.env.DATA_BASE;
app.use(express.json());
async function startServer() {
  try {
    await mongoose.connect(DB);
    console.log("DB Connection Success");
  } catch (error) {
    console.error("DB Connection Error:", error);
    process.exit(1); // Exit the process if the database connection fails
  }
}

app.listen(PORT,()=>{
    console.log(`Server up and running on ${PORT}`);
    startServer()

})
app.get("/",async (req,res)=>{
   try {
      const data = await Transaction.find()
      res.status(200).json({
         message:"Hello world working",data
      });
   } catch (error) {
      console.error(error);
      res.status(400).json({
         message:"Something went wrong"
      })
   }
})
app.get("/current-budget/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-based in JS
    const currentYear = currentDate.getFullYear();

    const budget = await Budget.findOne({
      userId,
      month: currentMonth,
      year: currentYear,
    });

    if (!budget) {
      return res
        .status(404)
        .json({ message: "No budget found for this month." });
    }

    res.status(200).json({ budget });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
});
app.patch("/update-budget/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body; // Contains only the fields the user wants to update

    const updatedBudget = await Budget.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedBudget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    res
      .status(200)
      .json({ message: "Budget updated successfully", budget: updatedBudget });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
});

app.get("/transactions/:userId/:year/:month", async (req, res) => {
  try {
    const { userId, year, month } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }
    const yearNum = parseInt(year, 10);
    const monthNum = parseInt(month, 10);
    if (isNaN(yearNum) || isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
      return res.status(400).json({ message: "Invalid year or month" });
    }
    const startDate = new Date(Date.UTC(yearNum, monthNum - 1, 1, 0, 0, 0, 0));
    const endDate = new Date(Date.UTC(yearNum, monthNum, 0, 23, 59, 59, 999));
    const transactions = await Transaction.find({
      userId: new mongoose.Types.ObjectId(userId),
      date: { $gte: startDate, $lte: endDate },
    }).sort({date:1});
    if (transactions.length === 0) {
      return res.status(404).json({ message: "No transactions found" });
    }
    res.status(200).json({ transactions });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
});

///
app.post("/transactions", async (req, res) => {
  try {
    const { userID, date, category, amount ,name} = req.body;
    console.log(userID, date, category, amount,name);

    if (!userID || !date || !category || !amount||!name) {
      console.log("1");
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }
    console.log("2");

    const transaction = new Transaction({
      name,
      userId:userID,
      date,
      category,
      amount,
    });
    console.log("3");
    await transaction.save();
    console.log("4");

    res
      .status(201)
      .json({ message: "Transaction added successfully", transaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.delete("/transaction/:transactionId", async (req, res) => {
  try {
    const { transactionId } = req.params;
    console.log(transactionId);
    const transaction = await Transaction.findByIdAndDelete(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});
app.patch("/transactions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { ...body }, // ✅ Spread `body` instead of wrapping it
      { new: true } // ✅ Ensures the response returns the updated document
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found" }); // ✅ Handle case if no document is found
    }

    res.status(200).json({ message: "Success", data: updatedTransaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});




app.get("/pie/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const year = new Date().getFullYear(); 
    const month = new Date().getMonth()+1 ; 

    // Default to the current year and month if not provided
    const yearNum = year 
    const monthNum = month 
    

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Define the date range for the selected month
    const startDate = new Date(Date.UTC(yearNum, monthNum - 1, 1, 0, 0, 0, 0));
    const endDate = new Date(Date.UTC(yearNum, monthNum, 0, 23, 59, 59, 999));

    // Aggregate transactions for the current month
    const data = await Transaction.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId), // Ensure userId is an ObjectId
          date: { $gte: startDate, $lt: endDate }, // Filter by current month
        },
      },
      {
        $group: {
          _id: "$category", // Group by category
          totalAmount: { $sum: "$amount" }, // Sum of amounts per category
          count: { $sum: 1 }, // Count transactions per category
          transactions: { $push: "$_id" }, // Store all transaction IDs per category
        },
      },
    ]);

    res.status(200).json({ data });
  } catch (error) {
    console.error("Error fetching pie chart data:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.get("/monthly-expense/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Aggregation Pipeline
    const data = await Transaction.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId), // Ensure userId is an ObjectId
        },
      },
      {
        $addFields: {
          month: { $dateToString: { format: "%Y-%m", date: "$date" } }, // Extract Year-Month
        },
      },
      {
        $group: {
          _id: { month: "$month", category: "$category" }, // Group by Month & Category
          totalAmount: { $sum: "$amount" }, // Sum of amounts per category
          count: { $sum: 1 }, // Count transactions per category
        },
      },
      {
        $sort: { "_id.month": 1 }, // Sort by month
      },
      {
        $group: {
          _id: "$_id.month",
          categories: {
            $push: {
              category: "$_id.category",
              totalAmount: "$totalAmount",
              count: "$count",
            },
          },
        },
      },
      {
        $sort: { _id: 1 }, // Sort months in ascending order
      },
    ]);

    res.status(200).json({ data });
  } catch (error) {
    console.error("Error fetching monthly expense data:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});


app.get("/bud/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const currentYear = new Date().getFullYear();

    // Get all budgets for the current year
    const budgets = await Budget.find({
      userId: new mongoose.Types.ObjectId(userId),
      year: currentYear,
    });

    if (!budgets.length) {
      return res
        .status(404)
        .json({ message: "No budget data found for this year" });
    }

    // Aggregate transactions for the current year
    const transactions = await Transaction.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          date: {
            $gte: new Date(`${currentYear}-01-01`),
            $lt: new Date(`${currentYear + 1}-01-01`),
          },
        },
      },
      {
        $group: {
          _id: { month: { $month: "$date" }, category: "$category" },
          totalSpent: { $sum: "$amount" },
        },
      },
    ]);

    // Organize transactions by month
    const transactionsByMonth = {};
    transactions.forEach(({ _id, totalSpent }) => {
      const { month, category } = _id;
      if (!transactionsByMonth[month]) transactionsByMonth[month] = {};
      transactionsByMonth[month][category] = totalSpent;
    });

    // Build response
    const response = budgets.map((budget) => {
      const monthTransactions = transactionsByMonth[budget.month] || {};
      const categorySummary = budget.categories.map((cat) => ({
        category: cat.name,
        budgeted: cat.amount,
        spent: monthTransactions[cat.name] || 0,
        difference: cat.amount - (monthTransactions[cat.name] || 0),
      }));

      const totalSpent = Object.values(monthTransactions).reduce(
        (acc, val) => acc + val,
        0
      );

      return {
        month: budget.month,
        year: budget.year,
        totalBudget: budget.totalBudget,
        totalSpent,
        remainingBudget: budget.totalBudget - totalSpent,
        categories: categorySummary,
      };
    });

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/analytics/:userID", async (req, res) => {
  try {
    const { userID } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const yearNum = new Date().getFullYear();
    const monthNum = new Date().getMonth();
    const startDate = new Date(yearNum, monthNum, 1, 0, 0, 0, 0);
    const endDate = new Date(yearNum, monthNum + 1, 0, 23, 59, 59, 999);

    console.log("Start Date:", startDate, "End Date:", endDate);

   const result = await Transaction.aggregate([
     {
       $match: {
         userId: new mongoose.Types.ObjectId(userID),
         date: { $gte: startDate, $lt: endDate },
       },
     },
     {
       $group: {
         _id: null,
         totalTransactions: { $sum: 1 },
         totalAmountSpent: { $sum: "$amount" },
         avgTransactionValue: { $avg: "$amount" },
       },
     },
   ]);

   const mostExpensiveTransaction = await Transaction.findOne({
     userId: new mongoose.Types.ObjectId(userID),
     date: { $gte: startDate, $lt: endDate },
   })
     .sort({ amount: -1 }) // Sort by highest amount
     .limit(1) // Get the most expensive transaction
     .lean(); // Convert to a plain object

   const mostSpentCategory = await Transaction.aggregate([
     {
       $match: {
         userId: new mongoose.Types.ObjectId(userID),
         date: { $gte: startDate, $lt: endDate },
       },
     },
     { $group: { _id: "$category", categoryTotal: { $sum: "$amount" } } },
     { $sort: { categoryTotal: -1 } },
     { $limit: 1 },
   ]);

   res.json(
     result.length
       ? {
           ...result[0],
           mostExpensiveTransaction: mostExpensiveTransaction || null, // Full transaction details
           mostSpentCategory: mostSpentCategory.length
             ? mostSpentCategory[0]
             : null,
         }
       : { message: "No transactions found for this month." }
   );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
