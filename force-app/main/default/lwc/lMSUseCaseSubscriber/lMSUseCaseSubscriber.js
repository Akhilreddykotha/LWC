import { LightningElement,wire } from 'lwc';
import {subscribe,MessageContext} from 'lightning/messageService';
import SAMPLE_MESSAGE from '@salesforce/messageChannel/record_msg__c';

export default class LMSUseCaseSubscriber extends LightningElement {
    message = "";    
    message2 = "";
    @wire(MessageContext)
    messageContext;

    connectedCallback(){
        console.log('Inside connectedCallback');
        this.subscribeMessageChannel();
    }
    subscribeMessageChannel(){
        subscribe(this.messageContext,SAMPLE_MESSAGE, (result) => this.handleResult(result));
    }

    handleResult(result){
        this.message = result.msg;
        this.message2 = result.msg2;
        console.log('@@@@@ '+this.result);
    }
}