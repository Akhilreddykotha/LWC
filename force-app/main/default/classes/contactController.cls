public with sharing class contactController {
    public contactController() {

    }
    @AuraEnabled(cacheable=true)    
    public static List<Contact> contactRecords(string conName){
        conName = '%' + conName + '%';
        List<Contact> conList = [SELECT Id,LastName, FirstName,Email,Phone,AccountId FROM Contact
                                    WHERE Name LIKE :conName];        
        return conList;
    }

    @AuraEnabled(cacheable=true)    
    public static List<Contact> contactRecordsSummary(Id recId){
        recId = '%' + recId + '%';
        List<Contact> conList = [SELECT Id,Name,Email,Phone FROM Contact
                                    WHERE Id =: recId];        
        return conList;
    }

    @AuraEnabled    
    public static List<Account> accountRecords(){

        return [Select Id,Name,Type,Phone From Account limit 5];
    }
}