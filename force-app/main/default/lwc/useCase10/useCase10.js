import { LightningElement } from 'lwc';
import matchingLeadName from '@salesforce/apex/usecae10.matchingLeadName';

export default class Usecase10 extends LightningElement {
    result;
    error;
    strLeadName= '';
    strLeadStatus = '';
    columns = [
        {
            label : "Name",
            fieldName : "Name"
        },
        {
            label : "Company",
            fieldName : "Company"
        },
        {
            label : "Phone",
            fieldName : "MobilePhone"
        },
        {
            label : "Status",
            fieldName : "Status"
        }
    ];

    handleLeadName(event){
        this.strLeadName = event.detail.value;
    }
    handleLeadStatus(event){
        this.strLeadStatus = event.detail.value;
    }

    handleReset(){
        this.result = false;
    }

    handleSearch(){
        matchingLeadName({ldName : this.strLeadName,ldStatus : this.strLeadStatus})
            .then((result) => {
                this.result = result;
            }).catch((error) => {
                this.error = error;
            })
    }
}