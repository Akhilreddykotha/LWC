@istest
public class oppFundingFieldUpdateTest {
    
    static String errorMsg = 'Not Equal';
    
    @testSetup
    static  void setupTestData(){
        List<Opportunity> oppList = new List<Opportunity>();
        Opportunity opp1 = new Opportunity(Name = 'test1',
                                   	StageName = 'Closed Won',
                                   	CloseDate = Date.Today().addDays(+30));
        Opportunity opp2 = new Opportunity(Name = 'test2',
                                   	StageName = 'Prospecting',
                                   	CloseDate = Date.Today().addDays(+30));
        
        oppList.add(opp1);
        oppList.add(opp2);
		
			insert oppList;
        
        List<Quote> quList = new List<Quote>();
        
        Quote qu1 = new Quote(Name = 'testQuote1',
                              Funding__c = 'Partial',
                              OpportunityId =opp1.Id );
        Quote qu2 = new Quote(Name = 'testQuote2',
                              Funding__c = 'Full',
                              OpportunityId =opp1.Id );
        Quote qu3 = new Quote(Name = 'testQuote3',
                              Funding__c = 'NA',
                              OpportunityId =opp1.Id );
        Quote qu4 = new Quote(Name = 'testQuote4',
                              Funding__c = 'Partial',
                              OpportunityId =opp1.Id );
        Quote qu5 = new Quote(Name = 'testQuote5',
                              Funding__c = 'Full',
                              OpportunityId =opp1.Id );
        Quote qu6 = new Quote(Name = 'testQuote6',
                              Funding__c = 'NA',
                              OpportunityId =opp1.Id );
        Quote qu7 = new Quote(Name = 'testQuote7',
                              Funding__c = 'NA',
                              OpportunityId =opp2.Id );
        
       
        quList.add(qu1);
        quList.add(qu2);
        quList.add(qu3);
        quList.add(qu4);
        quList.add(qu5);
        quList.add(qu6);
        quList.add(qu7);
        
        insert quList;
    }
    static testMethod void testMethodOppQu(){
        
        Test.startTest();
        oppFundingFieldUpdate obj = new oppFundingFieldUpdate();
        database.executeBatch(obj,5);
        Test.StopTest();
        
        Opportunity opty1 = [SELECT Id, Name, CloseDate, StageName, Funding__c
                            FROM Opportunity
                           	Where Name = 'test1'];
        system.assertEquals(opty1.Funding__c, 'Full,NA,Partial', errorMsg);
        Opportunity opty2 = [SELECT Id, Name, CloseDate, StageName, Funding__c
                            FROM Opportunity
                           	Where Name = 'test2'];
        system.assertEquals(opty2.Funding__c, null , errorMsg);
       
    }

}