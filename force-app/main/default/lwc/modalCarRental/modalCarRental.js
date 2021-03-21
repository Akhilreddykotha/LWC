import { LightningElement, api } from 'lwc';
import BOOKING_OBJECT from '@salesforce/schema/Car_Booking_Detail__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ModalCarRental extends LightningElement {
    objectApiName = BOOKING_OBJECT;
    
    @api carobject;
    @api startdate;
    @api enddate;

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
        fields.Car_Info__c = this.carobject.Id;
        fields.Start_Date__c = this.startdate;
        fields.End_Date__c = this.enddate;

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