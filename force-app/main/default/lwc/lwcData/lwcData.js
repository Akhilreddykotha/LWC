import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'

export default class LwcData extends LightningElement {
    connectedCallback(){
        alert('overRide working');
    }
}