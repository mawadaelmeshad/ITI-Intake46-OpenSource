const axios = require('axios');
const Donation = require('../models/donationModel');

async function createDonation(amount, userId) {
  return Donation.create({ amount, user: userId, status: 'pending' });
}

async function updateDonation(id, data) {
  return Donation.findByIdAndUpdate(id, data, { new: true });
}

async function createPaymentLink(donation) {
  try {
    const response = await axios.post(
      'https://test-api.kashier.io/v3/payment/sessions',
      {
        merchantId: process.env.KASHIER_MERCHANT_ID,
        order: String(donation._id),
        amount: String(donation.amount),
        currency: 'EGP',
        serverWebhook: process.env.KASHIER_WEBHOOK_URL,
        merchantRedirect: process.env.KASHIER_WEBHOOK_URL,
        customer: {
          name: donation.user.name,
          email: donation.user.email,
          reference: String(donation.user._id),
        },
      },
      {
        headers: {
          Authorization: process.env.KASHIER_SECRET_KEY,
          'api-key': process.env.KASHIER_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error('Kashier API error status:', err.response?.status);
    console.error('Kashier API error body:', JSON.stringify(err.response?.data, null, 2));
    throw err;
  }
}

async function listMyDonations(userId) {
  return Donation.find({ user: userId }).sort({ createdAt: -1 });
}

async function listAllDonations() {
  return Donation.find()
    .populate('user', 'name email')
    .sort({ createdAt: -1 });
}

module.exports = {
  createDonation,
  updateDonation,
  createPaymentLink,
  listMyDonations,
  listAllDonations,
};
