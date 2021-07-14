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
        fullName:['ninos'],
        gmail:[''],
        phone:['']
      })
    })
  }

}
