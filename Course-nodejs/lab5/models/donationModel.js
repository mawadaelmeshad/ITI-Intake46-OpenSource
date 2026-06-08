const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, 'Donation amount is required'],
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Donation must belong to a user'],
    },
    providerSessionId: {
      type: String,
    },
    link: {
      type: String,
    },
  },
  { timestamps: true }
);

const Donation = mongoose.model('Donation', donationSchema);
module.exports = Donation;
