import { api, LightningElement } from 'lwc';

export default class CarDetailsCard extends LightningElement {

    @api
    mycar;

    bookNowEvent(){
        console.log('Event from Child');
        const msg = new CustomEvent('bookingevt', {detail: this.mycar})
        this.dispatchEvent(msg);
    }
}