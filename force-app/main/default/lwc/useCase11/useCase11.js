import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';

export default class UseCase11 extends LightningElement {
    cseSubject;
    cseDescrip;
    csecaseorgin;
    cseId;
    error;

    handleSubject(event){
        this.cseSubject = event.target.value;
    }
    handleDescription(event){
        this.cseDescrip = event.target.value;
    }
    handleCaseOrigin(event){
        this.csecaseorgin = event.target.value;
    }
    createCase(){
        var fields = {'Subject' : this.cseSubject, 'Description' : this.cseDescrip, 'Origin' : this.csecaseorgin};
        var objRecordInput = {'apiName' : 'Case', fields};
        createRecord(objRecordInput).then(result =>{
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Case created',
                    variant: 'success',
                }),
            );
            this.cseId = result.id;
            
        }).catch(error => {
            this.error = "Case Creation Failed";
        });
    }
}