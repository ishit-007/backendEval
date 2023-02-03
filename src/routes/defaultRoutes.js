// const { response } = require('express');
// const axios=require('axios');
const Validator=require('../middlewares/validator');
const express = require('express');
const router = express.Router();
const Services=require('../services/companyServices');
// const db=require('../../database/models');
const controller=require('../controllers/companyController');
router.post('/api/save',controller.postCompanyHandler);

router.get('/api/companies',Validator.getValidator,  async(req, res) => {
  const sector = req.query.sector;
  const thisCompany = await Services.getCompanyBySector(sector);
  console.log(typeof thisCompany);
  console.log(thisCompany);
  res.send(thisCompany);
});

// router.patch()
module.exports = router;