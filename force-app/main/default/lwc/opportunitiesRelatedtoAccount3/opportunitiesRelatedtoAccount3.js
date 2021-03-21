import { LightningElement,api,track,wire} from 'lwc';
import getOpportunities from '@salesforce/apex/OppRelatedtoAccount.getOpportunities';
import updateOpportunity from '@salesforce/apex/OppRelatedtoAccount.updateOpportunity';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import {refreshApex} from '@salesforce/apex';
import {NavigationMixin} from 'lightning/navigation'

const columns = [{
    label: 'Opportunity Name',
    fieldName: 'Name'

}, {
    label: 'Stage Name',
    fieldName: 'StageName'
},
{
    label: 'Close Date',
    fieldName: 'CloseDate'
}
]

export default class OpportunitiesRelatedtoAccount3 extends LightningElement {

    @api recordId;
    @track opportunities = [];
    @track data = [];
    //@track areas = [];
    selectedRecords = [];
    columns = columns;
    refreshTable;
    error;

    @wire(getOpportunities, {
        recordId: '$recordId'
    })
    getOpportunities(result) {
        this.refreshTable = result;
        if (result.data) {
            this.data = result.data;
            let newData = data.map((item)=>
            Object.assign({},item,{

                linkUrl : +item.Id,
                linkName: item.Name
            })
                )
                this.data = newData;

        } else if (result.error) {
            this.error = result.error;
            console.log(this.error);
        }
    }
    getSelectedRecords(event) {
        const selectedRows = event.detail.selectedRows;
        let oppIds = new Set();
        for (let i = 0; i < selectedRows.length; i++) {
            oppIds.add(selectedRows[i].Id);
        }
        this.selectedRecords = Array.from(oppIds);
        window.console.log('selectedRecords ====> ' +this.selectedRecords);
    }
}