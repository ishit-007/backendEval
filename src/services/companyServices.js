const axios = require('axios');
// const { response } = require('express');
const db=require('../../database/models');

const postCompanyService=async (url,csv)=>{
  let data=csv.data;
  let index=1;
  let companyCEO;
  let companyName;
  data=data.split('\n');
  data.forEach(async(line)=>{
    if(index!=1){
      const company=line.split(',');
      const companyId=company[0];
      const companySector=company[1];
      const dataByIDPromise= getCompanyById(companyId);

      dataByIDPromise.then((dataByID)=>{
        companyName=dataByID.name;
        companyCEO=dataByID.ceo;
        const companyPerformancePromise=getCompanyBySector(companySector);
        return companyPerformancePromise;
      }).then((companyPerformance)=>{
        companyPerformance=companyPerformance.filter((company)=>company.companyId===companyId);
        const performanceIndex=companyPerformance[0].performanceIndex;
        const cpi=performanceIndex.filter((index)=>index.key==='cpi')[0].value;
        const cf=performanceIndex.filter((index)=>index.key==='cf')[0].value;
        const mau=performanceIndex.filter((index)=>index.key==='mau')[0].value;
        const roic=performanceIndex.filter((index)=>index.key==='roic')[0].value;
        const score=((cpi * 10) + (cf / 10000) + (mau * 10) + roic) / 4;
        // return {score:score,companyName:companyName,companyCEO:companyCEO};
        const addInDBPromise=db.Companies.create({
          companyID:companyId,
          companyName:companyName,
          ceo:companyCEO,
          score:score,
        });
        return addInDBPromise;
      }).then((addInDB)=>{
        console.log('Done');
        index++;
      });
      //   console.log(companyName);
      //   const companyPerformancePromise=getCompanyBySector(companySector).filter((company)=>company.companyId===companyId);
    } 
  });
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
  getCompanyBySector,
  getCompanyById,
  postCompanyService
};
