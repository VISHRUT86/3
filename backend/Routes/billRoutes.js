const express = require("express");
const Bill = require("../Models/Bill");
const ensureAuthenticated  = require("../Middlewares/Auth"); // ✅ Fixed Import

const router = express.Router();

router.post("/add", ensureAuthenticated, async (req, res) => {
  try {
    const { title, amount, dueDate, category } = req.body;

    // Validate if all fields are provided
    if (!title || !amount || !dueDate || !category) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if the dueDate is a valid future date
    const parsedDueDate = new Date(dueDate);
    if (isNaN(parsedDueDate.getTime())) {
      return res.status(400).json({ error: "Invalid due date" });
    }
    
    if (parsedDueDate < new Date()) {
      return res.status(400).json({ error: "Only future dates are allowed" });
    }

    // Create the new bill object
    const newBill = new Bill({
      userId: req.user.id, // Ensure req.user.id exists
      title,
      amount,
      dueDate: parsedDueDate, // Ensure dueDate is properly parsed
      category,
      status: "Due",
    });

    // Save the new bill to the database
    const savedBill = await newBill.save();

    if (!savedBill) {
      return res.status(500).json({ error: "Failed to save bill" });
    }

    // Respond with a success message and the saved bill data
    res.status(201).json({ message: "Bill added successfully", bill: savedBill });
  } catch (error) {
    console.error("Error adding bill:", error); // Log the error for debugging
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// ✅ Fetch all bills for the logged-in user
router.get("/", ensureAuthenticated, async (req, res) => {
  try {
    const bills = await Bill.find({ userId: req.user.id }).sort({ dueDate: 1 });

    if (!bills.length) {
      return res.status(404).json({ message: "No bills found" });
    }

    res.json(bills);
  } catch (error) {
    console.error("Error fetching bills:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Mark bill as Paid
router.put("/mark-paid/:id", ensureAuthenticated, async (req, res) => {
  try {
    const bill = await Bill.findOne({ _id: req.params.id, userId: req.user.id });
    
    if (!bill) return res.status(404).json({ error: "Bill not found" });

    bill.status = "Paid";
    await bill.save();
    res.json({ message: "Bill marked as Paid", bill });
  } catch (error) {
    console.error("Error marking bill as paid:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Delete a bill
router.delete("/delete/:id", ensureAuthenticated, async (req, res) => {
  try {
    const bill = await Bill.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

    if (!bill) return res.status(404).json({ error: "Bill not found" });

    res.json({ message: "Bill deleted successfully" });
  } catch (error) {
    console.error("Error deleting bill:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
