const axios=require('axios');
const Services=require('../services/companyServices');
// const db=require('../../database/models');
const postCompanyHandler=async(req,resp)=>{
  const url=req.body.urlLink;
  const csv=await axios.get(url);
  const postResp=await Services.postCompanyService(url,csv);
  resp.send(postResp);
};
const getCompanyBySectorHandler=async(req,resp)=>{
  const sector=req.query.sector;
  const thisCompany=await Services.getCompanyBySector(sector);
  resp.send(thisCompany);
};
const getCompanyByIdHandler=async(req,resp)=>{
  const id=req.query.id;
  const thisCompany=await Services.getCompanyById(id);
  resp.send(thisCompany);
};
// const getCompanyHandler=async(req,resp)=>{

// };
module.exports={
  postCompanyHandler,
  getCompanyBySectorHandler,
  getCompanyByIdHandler
};