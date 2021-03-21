public with sharing class OppRelatedtoAccount {
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunities(string recordId){
        return [SELECT Id, Name, StageName, CloseDate, AccountId FROM Opportunity where AccountId =: recordId];

            /*List<Opportunity> listOpp = [SELECT Id, Name, StageName, CloseDate, AccountId FROM Opportunity where AccountId =: recordId];

        List<DataTableWrapper> response = new List<DataTableWrapper>();
        for(Opportunity opp : listOpp){
            DataTableWrapper obj = new DataTableWrapper();
            obj.oppId = opp.Id;
            obj.name = opp.Name;
            obj.nameUrl = '/'+opp.Id;
            obj.stageName = opp.StageName;
            obj.closeDate = opp.CloseDate;
            response.add(obj);
        }

        return response;
    }

    private class DataTableWrapper {
        @AuraEnabled
        public Id oppId {get;set;}
        @AuraEnabled
        public String name {get;set;}
        @AuraEnabled
        public String nameUrl {get;set;}
        @AuraEnabled
        public String stageName {get;set;}
        @AuraEnabled
        public Date closeDate {get;set;}
    }
 */
        
    }

    @AuraEnabled
    public static void updateOpportunity(list<Id> lstOppIds){
        try {
            list<Opportunity> lstOppsToUpdate = new list<Opportunity>();
            System.debug('lstOppIds ====> '+lstOppIds);
            for(Id idOpp : lstOppIds) {
                lstOppsToUpdate.add(new Opportunity(Id = idOpp,StageName = 'Closed Won',CloseDate = date.today()));
            }
            if(!lstOppsToUpdate.isEmpty()) {
                update lstOppsToUpdate;
            }
        }
        catch(Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }
}