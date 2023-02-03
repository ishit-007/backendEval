const axios = require('axios');

const postService=()=>{

};
const getService=()=>{

};
const getCompanyBySector=async (sector)=>{
  const thisCompany = await axios.get(`http://54.167.46.10/sector?name=${sector}`);
  return thisCompany.data;
};
const getCompanyById=async (id)=>{
  const thisCompany=await axios.get(`http://54.167.46.10/company/${id}`);
  return thisCompany.data;
};
module.exports={
  postService,getService,
  getCompanyBySector,
  getCompanyById
};
