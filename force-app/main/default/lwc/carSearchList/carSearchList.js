import { api, LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import FILTER_MESSAGE from '@salesforce/messageChannel/filterMessageChannel__c';
import filteredCarList from '@salesforce/apex/CarInfoController.filteredCarList';

export default class CarSearchList extends LightningElement {
    seater='';
    group='';
    transmission='';
    startdate = null;
    enddate = null;
    isOpen = false;

    @api
    searchData;
    error;

    @api
    carObject;

    @wire(MessageContext)
    messageContext;

    connectedCallback(){
        console.log('Inside connectedCallback');
        this.subscribeMessageChannel();
    }

    subscribeMessageChannel(){
        subscribe(this.messageContext, FILTER_MESSAGE, (result) => this.handleResult(result));
        console.log('Message Subscribed');
    }

    handleResult(result){
        if(result.seater != undefined){
            this.seater = result.seater;
        }
        if(result.group != undefined){
            this.group = result.group;
        }
        if(result.transmission != undefined){
            this.transmission = result.transmission;
        }
        if(result.startdate != undefined){
            this.startdate = result.startdate;
        }
        if(result.enddate != undefined){
            this.enddate = result.enddate;
        }
        console.log('Value stored');
    }

    @wire(filteredCarList, {
        seater : '$seater',
        groupopt : '$group',
        transmissionopt : '$transmission',
        startdate : '$startdate',
        enddate : '$enddate'
    }) 
    wireddata({error, data}){
        if(data){
            this.searchData = data;
            this.error = undefined;
        } else if (error){
            this.searchData = undefined;
            this.error = error;
            console.log('Error is found' , error);
        }
    }

    handleBookingEvent(event){
        this.carObject = event.detail;
        this.isOpen = true;

        const modal = this.template.querySelector('c-modal-car-rental');
        modal.show();
    }
}