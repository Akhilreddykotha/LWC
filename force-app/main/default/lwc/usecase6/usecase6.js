import { LightningElement, api } from 'lwc';
import ACCOUNTNAME_FIELD from '@salesforce/schema/Opportunity.AccountId';
import AMOUNT_FIELD from '@salesforce/schema/Opportunity.Amount';
import CREATEDBY_FIELD from '@salesforce/schema/Opportunity.CreatedById';
import CLOSEDATE_FIELD from '@salesforce/schema/Opportunity.CloseDate';
import NAME_FIELD from '@salesforce/schema/Opportunity.Name';
import STAGENAME_FIELD from '@salesforce/schema/Opportunity.StageName';
import TYPE_FIELD from '@salesforce/schema/Opportunity.Type';


export default class Usecase6 extends LightningElement {
    @api objectApiName;
    @api recordId;

    accNameField = ACCOUNTNAME_FIELD;
    amountField = AMOUNT_FIELD;
    createbyField = CREATEDBY_FIELD;
    closeDateField = CLOSEDATE_FIELD;
    nameField = NAME_FIELD;
    stageNameField = STAGENAME_FIELD;
    typeField = TYPE_FIELD;
}