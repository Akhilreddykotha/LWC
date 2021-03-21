import { LightningElement,wire } from 'lwc';
import {subscribe, MessageContext} from 'lightning/messageService';
import PUBLISH_MSG from '@salesforce/messageChannel/get_records__c';
import contactRecords from '@salesforce/apex/contactController.contactRecords';

export default class MatchingContacts extends LightningElement {

    contactName="";
    getRowId;
    dtResult;
    error;

    columns = [
        {
            label : "Last Name",
            fieldName : "LastName"
        },
        {
            label : "First Name",
            fieldName : "FirstName"
        },
        {
            label : "Email",
            fieldName : "Email"
        },
        {
            label : "Phone",
            fieldName : "Phone"
        },
        {
            label : "Account Name",
            fieldName : "AccountId"
        },
    ];

    @wire(MessageContext)
    messageContext;

    connectedCallback(){
        this.subscribeToMessageChannel();
    }
    subscribeToMessageChannel(){
        subscribe(this.messageContext,PUBLISH_MSG, (result) => this.handleMessage(result));
    }

    handleMessage(result){
        this.contactName = result.message;
        console.log("Message"+result.message);
        this.getContacts();
    }
    getContacts(){
        contactRecords({conName: this.contactName})
            .then((result) => {
                this.dtResult = result;

            }).catch((error) => {
                this.error = error;
            })
    }
    onsuccess(){
        
        this.getRowId = this.template.querySelector('lightning-datatable').getSelectedRows()[0].Id;
        console.log('ID'+this.getRowId);
    }

}