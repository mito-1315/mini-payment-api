const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema(
  {
    email: { type: String, required: true },
    amount: { type: Number, required:true },
    currency: { type: String, required: true },
    merchant_id: {type: Number, required:true }
  },
  { timestamps: true }
);

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
