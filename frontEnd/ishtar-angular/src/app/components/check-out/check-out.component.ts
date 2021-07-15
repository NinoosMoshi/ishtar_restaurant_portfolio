import { StateCityService } from './../../services/state-city.service';
import { City } from './../../model/city';
import { State } from './../../model/state';
import { ThisReceiver, ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  states: State[] = [];
  cities: City[] = [];
  checkOutParentGroup!: FormGroup;

  constructor(private formChildGroup: FormBuilder, private stateCityService: StateCityService) { }

  ngOnInit(): void {
     this.myForm();
     this.getStates();
     this.getCities();
  }

  myForm(){
    this.checkOutParentGroup = this.formChildGroup.group({
      data:this.formChildGroup.group({
        fullName:[''],
        gmail:[''],
        phone:['']
      }),
      fromPerson:this.formChildGroup.group({
        state:[''],
        city:[''],
        street:[''],
        zipCode:['']
      }),
      toPerson:this.formChildGroup.group({
        state:[''],
        city:[''],
        street:[''],
        zipCode:['']
      }),
      creditCard:this.formChildGroup.group({
        cardType:[''],
        cardNumber:[''],
        code:['']
      }),
    })
  }


  done(){
    console.log(this.checkOutParentGroup.get('data')?.value);
    console.log(this.checkOutParentGroup.get('data.fullName')?.value);
  }


  similarGroup(event: Event){
    if((<HTMLInputElement>event.target).checked){
      this.checkOutParentGroup.controls.toPerson.setValue(this.checkOutParentGroup.controls.fromPerson.value)
    }else{
      this.checkOutParentGroup.controls.toPerson.reset();
    }
  }


  getStates(){
    this.stateCityService.getAllState().subscribe(
      data =>{
        this.states = data;
      }
    )
  }


  getCities(){
    this.stateCityService.getAllCities().subscribe(
      data =>{
        this.cities = data
      }
    )
  }

}
