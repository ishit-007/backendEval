const Services=require('../../src/services/companyServices');
describe('Testing Services',async ()=>{
  it('should return a company by sector',async()=>{
    const mockReq={
      sector:'Software'
    };
    
    jest.spyOn('axios','get').mockResolvedValue({data:[{companyID:'123',companyName:'test',ceo:'test',score:100}]});
    const mockResp=await Services.getCompanyBySector(mockReq);
    expect(mockResp).toEqual([{companyID:'123',companyName:'test',ceo:'test',score:100}]);
  });
});