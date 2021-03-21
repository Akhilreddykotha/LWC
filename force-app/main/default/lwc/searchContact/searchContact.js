import { LightningElement,wire } from 'lwc';
import {publish, MessageContext } from 'lightning/messageService';
import PUBLISH_MSG from '@salesforce/messageChannel/get_records__c';

export default class SearchContact extends LightningElement {

    contactName;

    @wire(MessageContext)
    messageContext;


    handleChange(event){
        this.contactName = event.target.value;
        publish(this.messageContext,  PUBLISH_MSG, {message : this.contactName});
        console.log('contactName: ', this.contactName);
    }
    /*handleSearch(){
        console.log('msg in handleSubmit: ', this.contactName);
        publish(this.messageContext,  PUBLISH_MSG, {message : this.contactName});
    }*/
}