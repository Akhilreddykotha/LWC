public with sharing class HotelRenting {
    public HotelRenting() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Hotel_Info__c> getAllHotels(String roomType, String hotelType, String location,
                                                    Date checkIn, Date checkOut){

    if(roomType == 'None' || roomType == ''){
        roomType = '%';
    }
    if(hotelType == 'None' || hotelType == ''){
        hotelType = '%';
    }
    if(location == 'None' || location == ''){
        location = '%';                   
    }
        return [SELECT Id, Name, Room_Type__c, Charges_Per_Day__c, IsBooked__c,
                 Hotel_Name__c, Picture_URL__c,Hotel_Type__c, Location__c, Amenities__c, Contact_Details__c 
                 FROM Hotel_Info__c WHERE Id NOT IN 
                 (SELECT Hotel_Info__c 
                   FROM Hotel_Booking_Info__c
                   WHERE ((Start_Date__c <= :checkIn AND End_Date__c >= :checkIn) OR
                   (Start_Date__c<= :checkOut AND End_Date__c>= :checkOut) OR
                   (Start_Date__c > :checkIn AND End_Date__c<= :checkOut) ) )
                 AND Room_Type__c LIKE :roomType
                 AND Location__c LIKE :location
                 AND Hotel_Type__c LIKE :hotelType];
    }
}