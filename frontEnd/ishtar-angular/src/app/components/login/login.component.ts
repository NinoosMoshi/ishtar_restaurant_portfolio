import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/security/authentication.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formParentGroup!: FormGroup;

  constructor(private formChildGroup: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
    this.myLoginForm();
  }


  myLoginForm(){
    this.formParentGroup = this.formChildGroup.group({
      user: this.formChildGroup.group({
        email:[''],
        password:['']
      })
    })
  }


  login(){
     this.authenticationService.executeAuthentication(this.formParentGroup.controls['user'].value.email,
                                                      this.formParentGroup.controls['user'].value.password).subscribe({
       next: response =>{
          this.router.navigateByUrl("/orders")
       },
       error: err =>{
           alert("Invalid Credentails")
       }
     })
  }



}
