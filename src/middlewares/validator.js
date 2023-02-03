const Joi = require('joi');
const { UUID } = require('sequelize');
const { HttpError } = require('../../errors/customError');

const nameSchema = Joi.object({
  sector: Joi.string().alphanum().min(1).max(30).required(),
  id:UUID
});
const getValidator = async (req, resp, next) => {
  try {
    const { error } = nameSchema.validate(req.query);
    if (error) {
      throw new HttpError(error.message, 400);
    }
    next();
  }
  catch (error) {
    if (error instanceof HttpError) {
      resp.status(error.statusCode).send(error.message);
    }
  }
};

module.exports = {
  getValidator,
};