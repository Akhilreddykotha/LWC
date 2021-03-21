import { LightningElement,api,wire } from 'lwc';
import { getRecord,getFieldValue } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Contact.Name';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';

export default class SummaryofContacts extends LightningElement {

    @api
    recid;
    data;
    error;
    
    connectedCallback(){
        console.log('recId' +this.recid);
    }
    
    
    @wire(getRecord,{recordId : '$recid' ,fields : [NAME_FIELD, PHONE_FIELD,EMAIL_FIELD]})
    wiredCntact({data,error}){
        if(data){
                console.log('data ' +JSON.stringify(data));
                this.data = data;
        }else if(error){
            console.log('data ' +JSON.stringify(error));
            this.error = error;
        }
    };


    get name() {
 
        return this.data.fields.Name.value;
        
    }

    get phone() {
        
        return this.data.fields.Phone.value;
    }

    get email(){
        return this.data.fields.Email.value;
    }
    

}