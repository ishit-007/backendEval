const validator = require('../../src/middlewares/validator');
describe('Middleware Testing', () => {
  it('should throw customError for post request', () => {
    const mockReq = {
      body: {
        urlLink: '123'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    const next = jest.fn();

    validator.postReqValidator(mockReq, mockRes, next);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ 'msg': '"urlLink" must be a valid uri' });
    expect(next).not.toHaveBeenCalled();

  });
  it('should not throw customError for post request', () => {
    const mockReq = {
      body: {
        urlLink: 'https://store-0001.s3.amazonaws.com/input.csv'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    const next = jest.fn();

    validator.postReqValidator(mockReq, mockRes, next);
    expect(mockRes.status).not.toBeCalled();
    expect(mockRes.json).not.toBeCalled();
    expect(next).toBeCalled();
  });
});

describe('Middleware Testing', () => {
  it('should throw customError for get request', () => {
    const mockReq = {
      query: {
        sector: '123'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    const next = jest.fn();

    validator.getReqValidator(mockReq, mockRes, next);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ 'msg': '"sector" with value "123" fails to match the required pattern: /^[a-zA-Z]+$/' });
    expect(next).not.toHaveBeenCalled();

  });

  it('should not throw customError for get request', () => {
    const mockReq = {
      query: {
        sector: 'Technology'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    const next = jest.fn();

    validator.getReqValidator(mockReq, mockRes, next);
    expect(mockRes.status).not.toBeCalled();
    expect(mockRes.json).not.toBeCalled();
    expect(next).toBeCalled();
  });
});

describe('Middleware Testing', () => {
  it('should throw customError for patch request', () => {
    const mockReq = {
      params: {
        id: '123'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    const next = jest.fn();
    validator.patchReqValidator(mockReq, mockRes, next);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ 'msg': '"id" must be a valid GUID' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should not throw customError for patch request', () => {
    const mockReq = {
      params: {
        id: '12345678-1234-1234-1234-123456789012'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    const next = jest.fn();
    validator.patchReqValidator(mockReq, mockRes, next);
    expect(mockRes.status).not.toHaveBeenCalledWith(400);
    expect(mockRes.json).not.toHaveBeenCalledWith({ 'msg': '"id" must be a valid GUID' });
    expect(next).toHaveBeenCalled();
  });
});
