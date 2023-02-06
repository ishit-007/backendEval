const joi = require('joi');
const { HttpError } = require('../utils/customError');
const urlSchema = joi.object({
  urlLink: joi.string().uri().required()
});
const idSchema = joi.object({
  id: joi.string().uuid().required()
});
const sectorSchema = joi.object({
  sector: joi.string().regex(/^[a-zA-Z]+$/).required()
});


const patchReqValidator = (req, res, next) => {
  try {
    const { error } = idSchema.validate(req.params);
    if (error) {
      throw (new HttpError(error.message, 400));
    }
    next();
  }
  catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ 'msg': error.message });
    }
  }
};
const postReqValidator = (req, res, next) => {
  try {
    const { error } = urlSchema.validate(req.body);
    if (error) {
      throw (new HttpError(error.message, 400));
    }
    next();
  }
  catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ 'msg': error.message });
    }
  }
};
const getReqValidator = (req, res, next) => {
  try {
    const { error } = sectorSchema.validate(req.query);
    if (error) {
      throw (new HttpError(error.message, 400));
    }
    next();
  }
  catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ 'msg': error.message });
    }
  }
};
module.exports = { postReqValidator, patchReqValidator, getReqValidator };