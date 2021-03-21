import { LightningElement } from 'lwc';

export default class HelloWorld extends LightningElement {
    name = "World";
    isVisible = false;
    handleChange(event){
        this.name = event.target.value;
    }

    handleClick(){
        this.isVisible = true;
    }

    handleDesClick(){
        this.isVisible = false;
    }
}