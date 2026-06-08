const Joi = require('joi');


const donationSchema = Joi.object({
  amount: Joi.number().min(10).required().messages({
    'number.base': 'Amount must be a number',
    'number.min': 'Amount must be at least 10',
    'any.required': 'Amount is required',
  }),
});

module.exports = donationSchema;
