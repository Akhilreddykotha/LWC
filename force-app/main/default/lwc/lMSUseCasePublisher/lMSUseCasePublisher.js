import { LightningElement,wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import SAMPLE_MESSAGE from '@salesforce/messageChannel/record_msg__c';

export default class LMSUseCase extends LightningElement {
    msg;
    msg2;

    @wire(MessageContext)
    messageContext;

    handleChange(event){
        this.msg = event.target.value;
        
    }
    handleChange2(event){
        this.msg2 = event.target.value;
        
    }

    handleClick(){
        const message = {msg : this.msg,
                        msg2 : this.msg2 };
        publish(this.messageContext, SAMPLE_MESSAGE, message);
    }

}