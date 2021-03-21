import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class SecondComponent extends LightningElement {
    name;
    email;
    phone;
    buttonLabel = 'Show';
    variant = 'Brand'
    areDetailsVisible = false;

    handleChange(event){
        this.name = event.target.value;
    }
    handleChange1(event){
        this.email = event.target.value;
    }
    handleChange2(event){
        this.phone = event.target.value;
    }
    handleClick(event){
        let label = event.target.label;
        if(label === 'Show'){
            this.buttonLabel = 'Hide';
            this.variant = 'destructive';
            this.areDetailsVisible = true;
        } else if (label === 'Hide'){
            this.buttonLabel = 'Show';
            this.variant = 'Brand';
            this.areDetailsVisible = false;
        }
        const ent = new ShowToastEvent({
            title: 'Sucess',
            message: 'Button is Clicked',
        });
        this.dispatchEvent(ent);
    }
}