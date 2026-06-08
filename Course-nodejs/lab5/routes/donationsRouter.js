const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const restrictTo = require('../middlewares/restrictTo');
const validate = require('../middlewares/validate');
const validateKashierHash = require('../middlewares/validateKashierHash');
const donationSchema = require('../validators/donationSchema');
const donationController = require('../controllers/donationController');

// ── POST /api/donations — authenticated user initiates a donation
router.post('/', auth, validate(donationSchema), donationController.createDonation);

// ── POST /api/donations/webhook — Kashier async callback (no JWT, HMAC-verified)
router.post('/webhook', validateKashierHash, donationController.handleWebhook);

// ── GET /api/donations — authenticated user views their own donation history
router.get('/', auth, donationController.listMyDonations);

// ── GET /api/donations/all — admin views all donations with user info
//    Declared BEFORE any /:id route to avoid "all" being matched as an ObjectId
router.get('/all', auth, restrictTo('admin'), donationController.listAllDonations);

module.exports = router;
