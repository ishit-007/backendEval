const Services=require('../../src/services/companyServices');
describe('Testing Services',async ()=>{
  it('should return a company by sector',async()=>{
    const mockInput='Software';
    jest.spyOn('axios','get').mockResolvedValue({data:[{companyID:'123',companyName:'test',ceo:'test',score:100}]});
    const mockResp=await Services.getCompanyBySector(mockInput);
    expect(mockResp).toEqual([{companyID:'123',companyName:'test',ceo:'test',score:100}]);
  });
  it('should return a company by id',async()=>{
    const mockInput='123';
    jest.spyOn('axios','get').mockResolvedValue({data:{companyID:'123',companyName:'test',ceo:'test',score:100}});
    const mockResp=await Services.getCompanyById(mockInput);
    expect(mockResp).toEqual({companyID:'123',companyName:'test',ceo:'test',score:100});
  });

});