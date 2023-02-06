const Services = require('../../src/services/defaultServices');
const db = require('../../database/models');
const axios = require('axios');
describe('Testing Score Calculation', () => {
  it('should calculate score when all 4 parameters are provided', () => {
    //((10 * 10) + (10000 / 10000) + (10 * 10) + 10) / 4
    const cpi = 10;
    const cf = 10000;
    const mau = 10;
    const roic = 10;
    const score = Services.calculateScore(cpi, cf, mau, roic);
    expect(score).toBe(52.75);
  });
}
);

describe('Testing getCompanyById functionality', () => {
  it('should return data recieved from axios', async () => {
    const mockId = 'b6472c52-732a-4fd2-a463-ae604c0a2c79';
    const mockData = {
      data: {}
    };
    jest.spyOn(axios, 'get').mockResolvedValue(mockData);
    const company = await Services.getCompanyByID(mockId);
    expect(company).toBe(mockData.data);
  });
}
);

describe('Testing getReqService', () => {
  it('should return data recieved from DB ranked by score', async () => {
    const mockSector = 'Software';
    const mockData = [{
      companyId: 'b6472c52-732a-4fd2-a463-ae604c0a2c78',
      companyName: 'Microsoft',
      ceo: 'Satya Nadella',
      score: 62.75,
    }, {
      companyId: 'b6472c52-732a-4fd2-a463-ae604c0a2c79',
      companyName: 'Apple',
      ceo: 'Tim Cook',
      score: 52.75,
    }];
    jest.spyOn(db.companyData, 'findAll').mockResolvedValue(mockData);
    const mockResp = [{
      id: 'b6472c52-732a-4fd2-a463-ae604c0a2c78',
      name: 'Microsoft',
      ceo: 'Satya Nadella',
      score: 62.75,
      rank: 1
    }, {
      id: 'b6472c52-732a-4fd2-a463-ae604c0a2c79',
      name: 'Apple',
      ceo: 'Tim Cook',
      score: 52.75,
      rank: 2
    }];
    const companies = await Services.getReqService(mockSector);
    expect(companies).toEqual(mockResp);
  });
}
);

describe('Testing getCompanyPerformance', () => {
  it('should return data recieved from axios', async () => {
    const mockId = 'b6472c52-732a-4fd2-a463-ae604c0a2c79';
    const mockSector = 'Software';
    const mockData = {
      data: [{
        companyId: 'b6472c52-732a-4fd2-a463-ae604c0a2c79',
        performanceIndex: {}
      }, {
        companyId: 'b6472c52-732a-4fd2-a463-ae604c0a2c78',
        performanceIndex: {}
      }]
    };
    const mockResp = [{
      companyId: 'b6472c52-732a-4fd2-a463-ae604c0a2c79',
      performanceIndex: {}
    }];
    jest.spyOn(axios, 'get').mockResolvedValue(mockData);
    const company = await Services.getCompanyPerformance(mockSector, mockId);
    expect(company).toEqual(mockResp);
  });
});

describe('Testing addToDatabase Functionality', () => {
  it('should return data recieved from DB', async () => {
    const mockName = 'Microsoft';
    const mockId = 'b6472c52-732a-4fd2-a463-ae604c0a2c79';
    const mockCeo = 'Satya Nadella';
    const mockScore = 62.75;
    const mockSector = 'Software';
    const mockResp = { name: mockName, companyId: mockId, ceo: mockCeo, score: mockScore, sector: mockSector };
    jest.spyOn(db.companyData, 'create').mockResolvedValue(mockResp);
    const company = await Services.addToDatabase(mockName, mockId, mockCeo, mockScore, mockSector);
    expect(company).toEqual(mockResp);

  });
});

// describe('Testing postReqService', () => {

//   it('', async () => {
//     const mockUrl = 'https://api.mocki.io/v1/9b9b9b9b';
//     // eslint-disable-next-line quotes
//     const resolvedValue = {
//       data: `company_id,company_sector
//     95b5a067-808a-44a9-a490-b4ef8a045f61,Automobile`};
//     jest.spyOn(axios, 'post').mockResolvedValue(resolvedValue);
//     const resolvedValue2 = {
//       id: '95b5a067-808a-44a9-a490-b4ef8a045f61',
//       name: 'Ford',
//       ceo: 'Jim Hackett',
//     };
//     const resolvedValue3 = [{
//       companyId: '95b5a067-808a-44a9-a490-b4ef8a045f61',
//       performanceIndex: [{
//         'key': 'cpi',
//         'value': 10
//       }, {
//         'key': 'cf',
//         'value': 10000
//       }, {
//         'key': 'mau',
//         'value': 10
//       }, {
//         'key': 'roic',
//         'value': 10
//       }]
//     }];
//     const resolvedValue4 = {
//       companyId: '95b5a067-808a-44a9-a490-b4ef8a045f61',
//       companyName: 'Ford',
//       score: 52.75
//     };
//     jest.spyOn(Services, 'getCompanyByID').mockResolvedValue(resolvedValue2);
//     jest.spyOn(Services, 'getCompanyPerformance').mockResolvedValue(resolvedValue3);
//     jest.spyOn(Services, 'addToDatabase').mockResolvedValue(resolvedValue4);
//     const resp = await Services.postReqSevice(mockUrl);
//     expect(resp).toEqual([resolvedValue4]);
//   });
// });

describe('Testing patchReqService', () => {
  it('',()=>{
    const mockCeo='Satya Nadella';
    const mockName='Microsoft';
    const mockResp1={ceo:mockCeo,companyName:mockName};
    jest.spyOn(db.companyData, 'findOne').mockResolvedValue(mockResp1);
    jest.spyOn(db.companyData, 'update').mockResolvedValue([2]);
  });
});