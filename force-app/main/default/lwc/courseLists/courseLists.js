import { LightningElement } from 'lwc';

export default class CourseLists extends LightningElement {
    
    CourseCode;
    
    handleChange(event){
        this.courseCode = event.target.value;
    }
}