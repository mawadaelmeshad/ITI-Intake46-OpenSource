const donationService = require('../services/donationService');
const emailService = require('../services/emailService');
const Donation = require('../models/donationModel');

async function createDonation(req, res, next) {
  try {
    const { amount } = req.body;
    const userId = req.user._id;

    const donation = await donationService.createDonation(amount, userId);
    const donationWithUser = await Donation.findById(donation._id).populate('user');
    const kashierResponse = await donationService.createPaymentLink(donationWithUser);

    const updated = await donationService.updateDonation(donation._id, {
      providerSessionId: kashierResponse._id,
      link: kashierResponse.sessionUrl,
    });

    res.status(200).json({ status: 'success', data: updated });
  } catch (err) {
    next(err);
  }
}

async function handleWebhook(req, res, next) {
  try {
    const { data } = req.body;
    const merchantOrderId = data.merchantOrderId;
    const kashierStatus = data.status;
    const newStatus = kashierStatus === 'SUCCESS' ? 'completed' : 'failed';

    await donationService.updateDonation(merchantOrderId, { status: newStatus });

    const donation = await Donation.findById(merchantOrderId).populate('user');

    if (donation && newStatus === 'completed' && donation.user) {
      try {
        await emailService.sendEmail(
          'donationSuccess',
          {
            name: donation.user.name,
            amount: donation.amount,
            donationId: String(donation._id),
          },
          donation.user.email,
          'Thank you for your donation!'
        );
      } catch (emailErr) {
        console.error('Failed to send donation success email:', emailErr.message);
      }
    }

    res.status(200).json({ status: 'success', message: 'Webhook processed' });
  } catch (err) {
    next(err);
  }
}

async function listMyDonations(req, res, next) {
  try {
    const data = await donationService.listMyDonations(req.user._id);
    res.status(200).json({ status: 'success', data });
  } catch (err) {
    next(err);
  }
}

async function listAllDonations(req, res, next) {
  try {
    const data = await donationService.listAllDonations();
    res.status(200).json({ status: 'success', data });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createDonation,
  handleWebhook,
  listMyDonations,
  listAllDonations,
};
