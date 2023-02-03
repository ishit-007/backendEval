const axios=require('axios');
const Services=require('../services/companyServices');
const db=require('../../database/models');
const postCompanyHandler=async(req,resp)=>{
  const url=req.body.urlLink;
  const csv=await axios.get(url);
  let data=csv.data;
  let index=1;
  data=data.split('\n');
  data.forEach(async(line)=>{
    if(index!=1){
      const company=line.split(',');
      const companyId=company[0];
      const companySector=company[1];
      const dataByID=await Services.getCompanyById(companyId);
      const companyName=dataByID.name;
      console.log(companyName);
      const companyCEO=dataByID.ceo;
      const companyPerformance=(await Services.getCompanyBySector(companySector)).filter((company)=>company.companyId===companyId);
      const performanceIndex=companyPerformance[0].performanceIndex;
      const cpi=performanceIndex.filter((index)=>index.key==='cpi')[0].value;
      const cf=performanceIndex.filter((index)=>index.key==='cf')[0].value;
      const mau=performanceIndex.filter((index)=>index.key==='mau')[0].value;
      const roic=performanceIndex.filter((index)=>index.key==='roic')[0].value;
      const score=((cpi * 10) + (cf / 10000) + (mau * 10) + roic) / 4;
  
        
      await db.Companies.create({
        companyID:companyId,
        companyName:companyName,
        ceo:companyCEO,
        score:score,
      });
      index++;
    } 
  });
  resp.send('success');
};
module.exports={
  postCompanyHandler,
};