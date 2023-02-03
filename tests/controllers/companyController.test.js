const Controller= require('../../src/controllers/companyController');
const Services=require('../../src/services/companyServices');
describe('Testing Controller',()=>{
  it('should return a company by sector',async()=>{
    const mockReq={
      query:{
        sector:'Software'
      }
    };
    const mockResp={send:jest.fn()};
    jest.spyOn(Services,'getCompanyBySector').mockResolvedValue({data:[{companyID:'123',companyName:'test',ceo:'test',score:100}]});
    await Controller.getCompanyBySectorHandler(mockReq,mockResp);
    expect(mockResp.send).toHaveBeenCalled();
  });
  it('should return a company by id',async()=>{
    const mockReq={
      query:{
        id:'123'
      }
    };
    const mockResp={send:jest.fn()};
    jest.spyOn(Services,'getCompanyById').mockResolvedValue({data:{companyID:'123',companyName:'test',ceo:'test',score:100}});
    await Controller.getCompanyByIdHandler(mockReq,mockResp);
    expect(mockResp.send).toHaveBeenCalled();
  });
});