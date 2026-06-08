const crypto = require('crypto');
const qs = require('query-string');
const _ = require('underscore');
const ApiError = require('../utils/apiError');

function validateKashierHash(req, res, next) {
  try {
    const { data } = req.body;

    if (!data || !data.signatureKeys) {
      return next(new ApiError(400, 'Invalid webhook payload: missing data or signatureKeys'));
    }

    const receivedSignature = req.headers['x-kashier-signature'];
    if (!receivedSignature) {
      return next(new ApiError(401, 'Missing Kashier signature header'));
    }

    const sortedKeys = [...data.signatureKeys].sort();
    const picked = _.pick(data, sortedKeys);
    const payload = qs.stringify(picked);

    const computedHash = crypto
      .createHmac('sha256', process.env.KASHIER_API_KEY)
      .update(payload)
      .digest('hex');

    if (computedHash !== receivedSignature) {
      return next(new ApiError(401, 'Invalid signature'));
    }

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = validateKashierHash;
