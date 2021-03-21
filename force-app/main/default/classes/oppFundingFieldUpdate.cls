global class oppFundingFieldUpdate implements Database.Batchable<sobject> {
    
    global set<string> fundingType = new set<string>();
    
    //Start
    global Database.QueryLocator start(Database.BatchableContext bc){
        return database.getQueryLocator([SELECT Funding__c, Id, Name, StageName,
                                         (Select Id,Name,OpportunityId, Funding__c FROM Quotes) 
                                         FROM Opportunity Where IsClosed = true
                                        ]);
    }
    
    //Execute
    global void execute(Database.BatchableContext bc, list<Opportunity> opp){
        
        list<Opportunity> opptyList = new list<Opportunity>();
  		
        //system.debug('opp' +opp);
        //system.debug('qt' +qt);
        //string partialStr;
        
        for(Opportunity op : opp){
            for(Quote qu : op.Quotes){
                //if(op.StageName =='Closed Won' || op.StageName == 'Closed Lost'){
                    
                   fundingType.add(qu.Funding__c); 
                    //fundingType.sort();
                    
                   /* if(qu.Funding__c=='Partial'){
                        //partialStr = 'Partial';
                        op.Funding__c = partialStr;
						fundingType.add = partialStr;
						//update op;
						//oppty.add(op);
                    } else if(qu.Funding__c =='Full'){
                        partialStr = partialStr+',Full';
                       // op.Funding__c = partialStr;
						fundingType.add = partialStr;
						//update op;
						//oppty.add(op);
                    }else{
                        partialStr = partialStr+',NA';
                       // op.Funding__c = partialStr;
						fundingType.add = partialStr;
						//update op;
						//oppty.add(op);
                    }*/
                    
           // }
            }
            List<string> fundingTypeList = new List<string>();
            fundingTypeList.addall(fundingType);
            fundingTypeList.sort();
            op.Funding__c = string.join(fundingTypeList, ',');
            opptyList.add(op);    
        }
         Database.SaveResult[] saveResList = Database.update(opptyList, false);
        
        for(Database.SaveResult sResult:saveResList){
            if(sResult.isSuccess()){
                system.debug('Sucessfull' +sResult.getId());
                
            }
            else{
                for(Database.Error errRes:sResult.getErrors()){
                    system.debug(errRes.getStatusCode() +':'+ errRes.getMessage());
                }
            }
        }
        
        	//opptyList.sort();
			//update opptyList;        
       /* for(opportunity oppor :oppty){
            oppor.Funding__c = partialStr;
            update oppor;
        }*/
       
    }
    
    //finish
    global void Finish(Database.BatchableContext bc){
        
    }

}