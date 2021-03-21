import { LightningElement, track,api,wire} from 'lwc';
import getOpportunities from '@salesforce/apex/OppRelatedtoAccount.getOpportunities';
import updateOpportunity from '@salesforce/apex/OppRelatedtoAccount.updateOpportunity';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import {refreshApex} from '@salesforce/apex';



export default class OpportunitiesRelatedtoAccount extends LightningElement {

    columns = [
        {label: 'Opportunity Name', fieldName: 'Name'},
        {label: 'Stage Name', fieldName: 'StageName'},
        {label: 'Close Date', fieldName: 'CloseDate'}
    ]

    @api recordId;
    @track isModalOpen = false;
    @track recordsCount = 0;
    @track data = [];
    @track error;
    selectedRecords = [];
    refreshTable;

   // @wire(getOpportunities,{ recordId: '$recordId' }) opportunity;
	/*@wire(getOpportunities, {recordId:'$recordId'})
    opp ({error, data}) {
        if (error) {
            console.log(JSON.stringify(error));
        } else if (data) {
            let newData = data.map((item) => 
                Object.assign({}, item, {
                    linkURL: '/'+ item.Id,
                    linkName: item.Name
                })
            )
            console.log(JSON.stringify(newData));
            this.data = newData;
        }
    }*/

    handleRowAction(e){

        const selectedRows = e.detail.selectedRows;
        
        this.recordsCount = e.detail.selectedRows.length;

        let oppIds = new Set();

        for (let i = 0; i < selectedRows.length; i++) {
            oppIds.add(selectedRows[i].Id);
        }
        this.selectedRecords = Array.from(oppIds);
    }
      

    openModal() {
        
        //eval("$A.get('e.force:refreshView').fire();");
        //window.location.reload();
       /* setTimeout(() => {
            this.isModalOpen = true;
        }, 10000);*/
        this.isModalOpen = true;
        //@wire(getOpportunities,{ recordId: '$recordId' }) opportunity;
        getOpportunities({recordId:'$recordId'})
        .then(result =>{
            this.data = result;
            this.error = undefined;
        })
        .catch(error=>{
            this.error = error;
            this.data = undefined;
        });
    }
    closeModal() {
        this.isModalOpen = false;
    }
    submitDetails() {
        this.isModalOpen = true;
        updateOpportunity({lstOppIds: this.selectedRecords})
        .then(result => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success!!', 
                    message: this.recordsCount + ' Opportunities are Updated.', 
                    variant: 'success'
                }),
            );

            //eval("$A.get('e.force:refreshView').fire();");
            //window.location.reload();
            return refreshApex(this.data);

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