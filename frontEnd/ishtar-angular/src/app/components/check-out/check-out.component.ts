import { ThisReceiver, ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  checkOutParentGroup!: FormGroup;

  constructor(private formChildGroup: FormBuilder) { }

  ngOnInit(): void {
    this.checkOutParentGroup = this.formChildGroup.group({
      data:this.formChildGroup.group({
        fullName:[''],
        gmail:[''],
        phone:['']
      }),
      fromPerson:this.formChildGroup.group({
        country:[''],
        state:[''],
        zipCode:['']
      }),
      toPerson:this.formChildGroup.group({
        country:[''],
        state:[''],
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



}
