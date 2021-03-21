import { LightningElement,api } from 'lwc';
import BOOKING_OBJECT from '@salesforce/schema/Hotel_Booking_Info__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class ModalHotelBooking extends LightningElement {
    objectApiName = BOOKING_OBJECT;

    @api hotelobj;
    @api checkin;
    @api checkout;

    @api status;

    @api show(){
        this.status= true;
    }

    closeModal(){
        this.status = false;
    }

    onSubmitHandler(event){
        event.preventDefault();

        const fields = event.detail.fields;
        fields.Hotel_Info__c = this.hotelobj.Id;
        fields.Start_Date__c = this.checkin;
        fields.End_Date__c = this.checkout;

        this.template.querySelector('lightning-record-edit-form').submit(fields);
         
        this.status = false;
    }

    handleSuccess(event){
        const evt = new ShowToastEvent({
            title: 'Hurray! Your Booking Id is: ' + event.detail.id,
            message: 'Car booked successfully from ' + this.startdate + ' to ' + this.enddate,
            variant : 'success',
            mode: 'sticky'
        });
        this.dispatchEvent(evt);
    }
}