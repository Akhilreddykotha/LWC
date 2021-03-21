import { LightningElement,api } from 'lwc';

export default class CallingLWCfromVf extends LightningElement {
    @api recordId;

    conFields = ['Name','Email','LeadSource','Phone'];
}