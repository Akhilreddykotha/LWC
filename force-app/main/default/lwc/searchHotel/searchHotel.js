import { LightningElement,api,wire } from 'lwc';
import { getObjectInfo, getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi'
import HOTEL_INFO__C_OBJECT from '@salesforce/schema/Hotel_Info__c'
import { publish, MessageContext } from 'lightning/messageService';
import SAMPLE_MESSAGE from '@salesforce/messageChannel/projectMessageChannel__c';

export default class SearchHotel extends LightningElement {
    @api roomType;
    @api checkIn;
    @api checkOut;
    @api hotelType;
    @api location;

    hotelTypeOptions;
    roomTypeOptions;
    locationOptions;

    @wire(getObjectInfo, { objectApiName: HOTEL_INFO__C_OBJECT })
    objectInfo;

    @wire(getPicklistValuesByRecordType, {
        recordTypeId: '$objectInfo.data.defaultRecordTypeId',
        objectApiName: HOTEL_INFO__C_OBJECT
    })
    wiredRecordtypeValues({ data, error }) {
        if (data) {
            this.hotelTypeOptions = data.picklistFieldValues.Hotel_Type__c.values;
            this.roomTypeOptions = data.picklistFieldValues.Room_Type__c.values;
            this.locationOptions = data.picklistFieldValues.Location__c.values; 
            //console.log('@@@@@  '+JSON.stringify(this.roomTypeOptions));           
        }
        if (error) {
            console.log(error);
        }
    }
    handleRoomType(event){
        this.roomType = event.target.value;
    }
    handleHotelType(event){
        this.hotelType = event.target.value;
    }
    handlelocation(event){
        this.location = event.target.value;
    }
    handleCheckIn(event){
        this.checkIn = event.target.value;
    }
    handleCheckOut(event){
        this.checkOut = event.target.value;
    }

    @wire(MessageContext)
    messageContext;

    showHotels(){
        const message = {
            roomType : this.roomType,
            hotelType : this.hotelType,
            location : this.location,
            checkIn : this.checkIn,
            checkOut : this.checkOut
        };

        publish(this.messageContext, SAMPLE_MESSAGE, message);
        console.log("Message is being published succesfully");
    }
    
    
}