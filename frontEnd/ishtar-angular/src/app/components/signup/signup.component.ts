import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/security/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  formParentGroup!: FormGroup;

  constructor(private formChildGroup: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router) { }

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
    this.authenticationService.createUser(
      this.formParentGroup.controls['user'].value.email,
      this.formParentGroup.controls['user'].value.password).subscribe({
           next: response =>{
                 this.router.navigateByUrl("/login")
              }
                                          })

  }

}
