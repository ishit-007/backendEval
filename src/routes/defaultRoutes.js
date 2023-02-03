// const { response } = require('express');
const axios=require('axios');
const express = require('express');
const router = express.Router();
const Services=require('../services/companyServices');
const db=require('../../database/models');

router.post('/api/save',async(req,resp)=>{
  const url=req.body.urlLink;
  const csv=await axios.get(url);
  let data=csv.data;
  let index=1;
  data=data.split('\n').forEach(async(line)=>{
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
      console.log([companyId,companyName,companySector,companyCEO,score]);
      await db.Companies.create({
        companyID:companyId,
        companyName:companyName,
        ceo:companyCEO,
        score:score,
      });
      index++;
      resp.send('success');
    }
  });
});

router.get('/api/companies',  async(req, res) => {
  const sector = req.query.sector;
  const thisCompany = await Services.getCompanyBySector(sector);
  console.log(typeof thisCompany);
  console.log(thisCompany);
  res.send(thisCompany);
});

// router.patch()
module.exports = router;