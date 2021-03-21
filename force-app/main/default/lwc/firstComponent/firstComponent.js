import { LightningElement } from 'lwc';

export default class FirstComponent extends LightningElement {
    name = 'World';

    handleChange(event){
        this.name = event.target.value;
    }
}