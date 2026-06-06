const Joi = require('joi');

const createPostSchema = Joi.object({
  title: Joi.string().min(3).required(),
  content: Joi.string().min(1).required(),
  userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
});

const updatePostSchema = Joi.object({
  title: Joi.string().min(3),
  content: Joi.string().min(1),
  userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
}).min(1);

module.exports = { createPostSchema, updatePostSchema };
