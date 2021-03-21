public with sharing class usecae10 {
    public usecae10() {

    }
    @AuraEnabled
    public static List<Account> matchingAccountName(String accName){
        accName = '%' + accName + '%';
        List<Account> accList = [SELECT Id, Name, AnnualRevenue, Rating, Industry FROM Account
                                    WHERE Name LIKE :accName];
        return accList;
    }
    @AuraEnabled
    public static List<Lead> matchingLeadName(String ldName,String ldStatus){
        ldName = '%' + ldName + '%';
        ldStatus = '%' + ldStatus + '%';
        List<Lead> ldList = [SELECT Id, Name, Rating, Industry,status FROM Lead
                                    WHERE Name LIKE :ldName AND status LIKE :ldStatus];
        return ldList;
    }
}