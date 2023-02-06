const Services = require('../services/defaultServices');
const postReqHandler = async (req, res) => {
  const url = req.body.urlLink;
  const data = await Services.postReqSevice(url);
  res.status(201).send(data);
};
const getReqHandler = async (req, res) => {
  const sector = req.query.sector;
  const comapanies = await Services.getReqService(sector);
  res.status(200).send(comapanies);
};
const patchReqHandler = async (req, res) => {
  const id = req.params.id;
  const ceo = req.body.ceo;
  const name = req.body.name;
  const data = await Services.patchReqService(id, ceo, name);
  if (typeof data === 'string') {
    res.status(400).send(data);
  }
  else {
    res.status(200).send(data);
  }
};
module.exports = { postReqHandler, getReqHandler, patchReqHandler };