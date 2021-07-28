import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  formParentGroup!: FormGroup;

  constructor(private formChildGroup: FormBuilder) { }

  ngOnInit(): void {
    this.mySignupForm();
  }


  mySignupForm(){
    this.formParentGroup = this.formChildGroup.group({
      user: this.formChildGroup.group({
        email:[''],
        password:['']
      })
    })
  }


  signup(){
    console.log(this.formParentGroup.controls['user'].value.email)
  }

}
