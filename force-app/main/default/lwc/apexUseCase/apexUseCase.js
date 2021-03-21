import { LightningElement, wire } from 'lwc';
import contactRecords from '@salesforce/apex/contactController.contactRecords';
import accountRecords from '@salesforce/apex/contactController.accountRecords';

export default class ApexUseCase extends LightningElement {
    error;
    contacts;
    result;

    @wire(contactRecords)
    wiredContacts({error,data}){
        if(data){
            this.contacts = data;
        }else if(error){
            this.error = error;
        }
    }
 
    handleClick(){
        accountRecords()
            .then( result  =>{
                this.result = result;
            })
            .catch( error =>{
                this.error = error;
            });
    }
}