const axios = require('axios');
const db = require('../../database/models');

const postReqSevice = async (url) => {
  let data = (await axios.get(url)).data;
  const response = [];
  data = data.split('\n').splice(1);
  data = data.map((item) => {
    let thisID = item.split(',')[0];
    let thisSector = item.split(',')[1];
    return [thisID, thisSector];
  });
  for (let company of data) {
    const thisCompany = await getCompanyByID(company[0]);
    const thisCompanyID = thisCompany.id;
    const thisCompanyName = thisCompany.name;
    const thisCompanyCEO = thisCompany.ceo;
    const thisCompanySector = company[1];
    const thisCompanyPerformance = await getCompanyPerformance(thisCompanySector, thisCompanyID);
    const thisCompanyPerformanceIndex = thisCompanyPerformance[0].performanceIndex;
    const cpi = thisCompanyPerformanceIndex.filter((item) => item.key === 'cpi')[0].value;
    const cf = thisCompanyPerformanceIndex.filter((item) => item.key === 'cf')[0].value;
    const mau = thisCompanyPerformanceIndex.filter((item) => item.key === 'mau')[0].value;
    const roic = thisCompanyPerformanceIndex.filter((item) => item.key === 'roic')[0].value;
    const score = calculateScore(cpi, cf, mau, roic);
    const companyAddedToDatabase = (await addToDatabase(thisCompanyName, thisCompanyID, thisCompanyCEO, score, thisCompanySector)).dataValues;
    const companyObject = {
      id: companyAddedToDatabase.companyId,
      name: companyAddedToDatabase.companyName,
      score: companyAddedToDatabase.score,
    };
    response.push(companyObject);
  }
  return response;
};
const getCompanyByID = async (id) => {
  const thisCompany = await axios.get(`http://54.167.46.10/company/${id}`);
  return thisCompany.data;
};
const getCompanyPerformance = async (sector, id) => {
  const companies = await axios.get(`http://54.167.46.10/sector?name=${sector}`);
  const thisCompany = companies.data.filter((company) => company.companyId === id);
  return thisCompany;
};
const addToDatabase = async (companyName, companyId, ceo, score, sector) => {
  const company = await db.companyData.create({
    raw: true,
    companyName: companyName,
    companyId: companyId,
    ceo: ceo,
    score: score,
    sector: sector
  });
  return company;
};
const calculateScore = (cpi, cf, mau, roic) => {
  return ((cpi * 10) + (cf / 10000) + (mau * 10) + roic) / 4;
};
const getReqService = async (sector) => {
  const companies = await db.companyData.findAll({
    raw: true,
    where: {
      sector: sector
    },
    attributes: ['companyId', 'companyName', 'ceo', 'score'],
    order: [['score', 'DESC']]
  });
  let rank = 1;
  const rankedCompanies = companies.map((company) => {
    return ({
      id: company.companyId,
      name: company.companyName,
      ceo: company.ceo,
      score: company.score,
      rank: rank++
    });
  });
  return rankedCompanies;
};
const patchReqService = async (id, ceo, name) => {
  const thisCompany = await db.companyData.findOne({
    raw: true,
    where: {
      companyId: id
    }
  });
  const originalCEO = thisCompany.ceo;
  const originalName = thisCompany.companyName;
  const numUpdates = await db.companyData.update({
    ceo: ceo === undefined ? originalCEO : ceo,
    companyName: name === undefined ? originalName : name
  }, {
    where: {
      companyId: id
    }
  });
  if (numUpdates[0] === 0) {
    return 'No company with that ID exists';
  }
  else {
    const updateResp = await db.companyData.findOne({
      raw: true,
      where: {
        companyId: id
      },
      attributes: ['companyId', 'companyName', 'ceo']
    });
    return updateResp;
  }
};
module.exports = { postReqSevice, getReqService, patchReqService, calculateScore, addToDatabase, getCompanyPerformance, getCompanyByID };