const axios=require('axios');
const Services=require('../services/companyServices');
const db=require('../../database/models');
const postCompanyHandler=async(req,resp)=>{
  Services.postCompanyService(req,resp);
  resp.send('success');
};
const getCompanyHandler=async(req,resp)=>{

};
module.exports={
  postCompanyHandler,
};