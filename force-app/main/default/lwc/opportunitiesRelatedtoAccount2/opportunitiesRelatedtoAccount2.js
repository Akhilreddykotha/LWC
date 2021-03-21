import { LightningElement,track,wire,api} from 'lwc';
import getOpportunities from '@salesforce/apex/OppRelatedtoAccount.getOpportunities';
import updateOpportunity from '@salesforce/apex/OppRelatedtoAccount.updateOpportunity';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import {refreshApex} from '@salesforce/apex';

export default class OpportunitiesRelatedtoAccount2 extends LightningElement {

        columns = [
            {label: 'Opportunity Name', fieldName: 'Name'},
            {label: 'Stage Name', fieldName: 'StageName', editable: true},
            {label: 'Close Date', fieldName: 'CloseDate'}
        ]

        @track buttonLabel = 'Submit';
        @track isTrue = false;
        @track recordsCount = 0;
        @api recordId;

        selectedRecords = [];
        refreshTable;
        error;
        data;

        @wire(getOpportunities,{ recordId: '$recordId' }) 
        
        getfullAreaItems(result) {
            this.refreshTable = result;
            if (result.data) {
                this.data = result.data;
            } else if (result.error) {
                this.error = result.error;
                console.log(this.error);
            }
        }

     
        handleRowAction(event) {
        
        const selectedRows = event.detail.selectedRows;
        
        this.recordsCount = event.detail.selectedRows.length;

        let oppIds = new Set();
        for (let i = 0; i < selectedRows.length; i++) {
            oppIds.add(selectedRows[i].Id);
        }
        this.selectedRecords = Array.from(oppIds);
    }

    submitHandler() {
        if (this.selectedRecords) {
            
            this.buttonLabel = 'Processing....';
            this.isTrue = true;

            this.Updateoppty();
        }
    }

    Updateoppty() {
        updateOpportunity({lstOppIds: this.selectedRecords})
        .then(result => {

            this.buttonLabel = 'Submit';
            this.isTrue = false;

            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success!!', 
                    message: this.recordsCount + ' Opportunities are Updated.', 
                    variant: 'success'
                }),
            );

            return refreshApex(this.getfullAreaItems);

        }).catch(error => {
            window.console.log(error);
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error while getting Opportunities', 
                    message: error.message, 
                    variant: 'error'
                }),
            );
        });
     
    }
}