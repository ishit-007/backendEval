const controller = require('../../src/controllers/defaultController');
const Services = require('../../src/services/defaultServices');
describe('Testing getReqHandler', () => {
  it('', async () => {
    const mockReq = {
      query: {
        sector: 'Software'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const mockResolvedValue = [{
      'id': 'ad36a7f5-7630-496e-8628-e70981179668',
      'name': 'Company ABC',
      'ceo': 'Some person name',
      'score': 67.45,
      'ranking': 1
    }, {
      'id': 'ad36a7f5-7630-496e-8628-e70981179668',
      'name': 'Company DEF',
      'ceo': 'Some person name',
      'score': 62.45,
      'ranking': 2
    }];
    jest.spyOn(Services, 'getReqService').mockResolvedValue(mockResolvedValue);
    await controller.getReqHandler(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith(mockResolvedValue);
  });
});

describe('Testing postReqHandler', () => {
  it('', async () => {
    const mockReq = {
      body: {
        urlLink: 'https://www.google.com/'
      }
    };
    jest.spyOn(Services, 'postReqSevice').mockResolvedValue([{
      'id': 'ad36a7f5-7630-496e-8628-e70981179668',
      'name': 'Company ABC',
      'score': 67.45,
    }, {
      'id': 'f6827fd2-656b-4264-b0cf-f449ab7a131d',
      'name': 'Company DEF',
      'score': 52.45,
    }]);

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    await controller.postReqHandler(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.send).toHaveBeenCalledWith([{
      'id': 'ad36a7f5-7630-496e-8628-e70981179668',
      'name': 'Company ABC',
      'score': 67.45,
    }, {
      'id': 'f6827fd2-656b-4264-b0cf-f449ab7a131d',
      'name': 'Company DEF',
      'score': 52.45,
    }]);
  });
});

describe('Testing patchReqHandler', () => {
  it('', async () => {
    const mockId = 'ad36a7f5-7630-496e-8628-e70981179668';
    const mockCeo = 'Some person name';
    const mockName = 'Company ABC';
    const mockReq = {
      params: {
        id: mockId
      },
      body: {
        ceo: mockCeo,
        name: mockName
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    jest.spyOn(Services, 'patchReqService').mockResolvedValue('No company with that ID exists');
    await controller.patchReqHandler(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith('No company with that ID exists');
  });
});

describe('Testing patchReqHandler', () => {
  it('', async () => {
    const mockId = 'ad36a7f5-7630-496e-8628-e70981179668';
    const mockCeo = 'Some person name';
    const mockName = 'Company ABC';
    const mockReq = {
      params: {
        id: mockId
      },
      body: {
        ceo: mockCeo,
        name: mockName
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    jest.spyOn(Services, 'patchReqService').mockResolvedValue({
      companyID: mockId,
      ceo: mockCeo,
      name: mockName
    });
    await controller.patchReqHandler(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith({
      companyID: mockId,
      ceo: mockCeo,
      name: mockName
    });
  });
});