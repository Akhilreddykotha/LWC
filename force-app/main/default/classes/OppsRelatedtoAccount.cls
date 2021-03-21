public with sharing class OppsRelatedtoAccount {
	@auraEnabled(cacheable=true)
    public static List<Opportunity> getOppRecords(string recordId){
        return [SELECT Id, Name, StageName, CloseDate FROM Opportunity where AccountId =: recordId];
    }
}