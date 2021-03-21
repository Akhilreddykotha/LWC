import { LightningElement,wire,api } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import SAMPLE_MESSAGE from '@salesforce/messageChannel/projectMessageChannel__c';
import getAllHotels from '@salesforce/apex/HotelRenting.getAllHotels';
import BOOKING_OBJECT from '@salesforce/schema/Hotel_Booking_Info__c';

export default class HotelsList extends LightningElement {

    roomType='';
    hotelType='';
    location='';
    checkOut = null;
    checkIn = null;
    isOpen = false;
    objectApiName = BOOKING_OBJECT;
    isModalOpen = false;
    data;

    @api
    searchData;
    error;
    
    @wire(MessageContext)
    messageContext;

    connectedCallback(){
        console.log('Inside connectedCallback');
        this.subscribeMessageChannel();
    }

    subscribeMessageChannel(){
        subscribe(this.messageContext, SAMPLE_MESSAGE, (result) => this.handleResult(result));
    }
    handleResult(result){
        if(result.roomType != undefined){
            this.roomType = result.roomType;
        }
        if(result.hotelType != undefined){
            this.hotelType = result.hotelType;
        }
        if(result.location != undefined){
            this.location = result.location;
        }
        if(result.checkIn != undefined){
            this.checkIn = result.checkIn;
        }
        if(result.checkOut != undefined){
            this.checkOut = result.checkOut;
        }
        console.log('Value stored');
    }
    @wire(getAllHotels, {
        roomType : '$roomType',
        hotelType : '$hotelType',
        location : '$location',
        checkIn : '$checkIn',
        checkOut : '$checkOut'
    }) 
    wireddata({error, data}){
        if(data){
            this.searchData = data;
            this.error = undefined;
            console.log('Error is found' , +this.searchData);
        } else if (error){
            this.searchData = undefined;
            this.error = error;
            console.log('Error is found' , error);
        }
    }
    handleBooking(event){  
        this.data = event.target.value;  
        console.log('@@@@@'+JSON.stringify(event.currentTarget.value));    
        this.isModalOpen = true;
    }
    closeModal(){
        this.isModalOpen = false;
    }
    onSubmitHandler(event){
        event.preventDefault();

        const fields = event.detail.fields;
        fields.Hotel_Info__c = this.data;
        fields.Start_Date__c = this.checkIn;
        fields.End_Date__c = this.checkOut;

        this.template.querySelector('lightning-record-edit-form').submit(fields);
         
        this.isModalOpen = false;
    }
    handleSuccess(event){
        const evt = new ShowToastEvent({
            title: 'Hurray! Your Booking Id is: ' + event.detail.id,
            message: 'Hotel booked successfully from ' + this.checkIn + ' to ' + this.checkOut,
            variant : 'success',
            mode: 'sticky'
        });
        this.dispatchEvent(evt);
    }
    
}