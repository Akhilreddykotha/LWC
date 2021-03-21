import {api, LightningElement } from 'lwc';

export default class CourseData extends LightningElement {
    @api
    CourseData = [
        {
            Id: 1,
            Name: 'Salesforce',
            Duration: '3 weeks' 
        },
        {
            Id: 2,
            Name: 'LWC',
            Duration: '2 weeks' 
        },
        {
            Id: 3,
            Name: 'Vlocity',
            Duration: '3 weeks' 
        },{
            Id: 4,
            Name: 'Mule Soft',
            Duration: '4 weeks' 
        },
        {
            Id: 5,
            Name: '.Net',
            Duration: '6 weeks' 
        }
    ]
}