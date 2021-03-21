import { api, LightningElement, wire } from 'lwc';
import { getObjectInfo, getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi'
import CAR_INFO__C_OBJECT from '@salesforce/schema/Car_Info__c';
import { publish, MessageContext } from 'lightning/messageService';
import FILTER_MESSAGE from '@salesforce/messageChannel/filterMessageChannel__c';

export default class CarSearch extends LightningElement {
    @api seater;
    @api group;
    @api transmission;
    @api startdate;
    @api enddate;

    seateroptions;
    groupoptions;
    transmissionoptions;

    @wire(getObjectInfo, { objectApiName: CAR_INFO__C_OBJECT })
    objectInfo;

    @wire(getPicklistValuesByRecordType, {
        recordTypeId: '$objectInfo.data.defaultRecordTypeId',
        objectApiName: CAR_INFO__C_OBJECT
    })
    wiredRecordtypeValues({ data, error }) {
        if (data) {

            this.seateroptions = data.picklistFieldValues.Seater__c.values;
            this.groupoptions = data.picklistFieldValues.Group__c.values;
            this.transmissionoptions = data.picklistFieldValues.Transmission__c.values;

        }
        if (error) {
            console.log(error);
        }
    }

    handlSeaterChange(event){
        this.seater = event.target.value;
    }
    handleTransmissionChange(event){
        this.transmission = event.target.value;
    }
    handleGroupChange(event){
        this.group = event.target.value;
    }
    handleEndDate(event){
        this.enddate = event.target.value;
    }
    handleStartDate(event){
        this.startdate = event.target.value;
    }

    @wire(MessageContext)
    messageContext;

    showCars(){
        const message = {
            seater : this.seater,
            group : this.group,
            transmission : this.transmission,
            startdate : this.startdate,
            enddate : this.enddate
        };
        
        publish(this.messageContext, FILTER_MESSAGE, message);
        console.log("Message is being published succesfully");
    }
}