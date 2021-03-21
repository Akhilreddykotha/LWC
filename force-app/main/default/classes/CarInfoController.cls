public with sharing class CarInfoController {
    public CarInfoController() {

    }
    @AuraEnabled(cacheable = true)
    public static List<Car_Info__c> filteredCarList(String seater, String groupopt, String transmissionopt,
                                                        Date startdate, Date enddate){

    if(seater == 'None' || seater == ''){
        seater = '%';
    }
    if(groupopt == 'None' || groupopt == ''){
        groupopt = '%';
    }
    if(transmissionopt == 'None' || transmissionopt == ''){
        transmissionopt = '%';
    }
    return [SELECT Id, Name__c, Seater__c, Group__c, Transmission__c, Picture_URL__c, Charges_Per_Day__c
                        FROM Car_Info__c
                        WHERE Id NOT IN 
                        (SELECT Car_Info__c 
                          FROM Car_Booking_Detail__c
                          WHERE ((Start_Date__c <= :startDate AND End_Date__c >= :startDate) OR
                          (Start_Date__c<= :endDate AND End_Date__c>= :endDate) OR
                          (Start_Date__c > :startDate AND End_Date__c<= :endDate) ) )
                        AND Seater__c LIKE :seater
                        AND Transmission__c LIKE :transmissionopt
                        AND Group__c LIKE :groupopt];
    }
}