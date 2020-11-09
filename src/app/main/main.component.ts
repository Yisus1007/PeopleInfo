import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { Services } from '../Services/services'

@Component({
  selector: 'acme-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  peopleInformation: FormGroup;
  firstName : String;
  firstLastName : String;
  birthDay : string
  countDownforBDay : String;
  poem : String;
  age : String;
  poemRecived : boolean = false;
  constructor(private formBuilder: FormBuilder, private services : Services) { }

  ngOnInit(): void {
    this.createForm(); 
  }
  cleanModal(): void{
    console.log("MainComponent - consultBDay - Init");
    this.age = "";
    this.firstName = "";
    this.firstLastName = "";
    this.poem = "";
    this.poemRecived = false;
    this.countDownforBDay ="";
    this.birthDay = "";
    console.log("MainComponent - consultBDay - end");
  }

  createForm(): void{
    this.peopleInformation = this.formBuilder.group ({
      fullName: '',
      birthDate: ''
    });
  }
  async consultBDay() : Promise<void>{
    console.log("MainComponent - consultBDay - Init");
    let jsonToSend = {
      name : this.peopleInformation.value.fullName,
      dateOfBirth : this.peopleInformation.value.birthDate,
    }
    console.log("MainComponent - consultBDay - jsonToSend: ", JSON.stringify(jsonToSend));
    await this.services.consultInfo(jsonToSend).then((response)=>{
      console.log("MainComponent - consultBDay - response Recived: ", JSON.stringify(response));
      var splitedNames = response['name'].split(" ");
      console.log("MainComponent - consultBDay - splitedNames: ", JSON.stringify(splitedNames));
      this.firstName = splitedNames[0];
      this.firstLastName = splitedNames[1];
      console.log("MainComponent - consultBDay - firstName: ", JSON.stringify(this.firstName));
      console.log("MainComponent - consultBDay - firstLastName: ", JSON.stringify(this.firstLastName));
      this.age = response['age'];
      this.countDownforBDay = response['dateToBirth'];
      var day = this.peopleInformation.value.birthDate.substring(0,2) + "/";
      var month = this.peopleInformation.value.birthDate.substring(3,5)+ "/";
      var year = this.peopleInformation.value.birthDate.substring(8,10);
      this.birthDay = day+month+year;
      console.log("MainComponent - consultBDay - firstLastName: ", JSON.stringify(this.birthDay));
      if(response['poem'] != null)
      {
        console.log("MainComponent - consultBDay - poema Recived: ", JSON.stringify(response['poem']));
        this.poemRecived = true;
        this.poem = response['poem'];
      }

    }).catch((error)=>{
      console.log("MainComponent - consultBDay - error Recived: ", JSON.stringify(error));
    });
  }

}
