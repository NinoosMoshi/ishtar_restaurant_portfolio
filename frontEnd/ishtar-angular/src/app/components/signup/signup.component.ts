import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpaceValidator } from 'src/app/model/space-validator';
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
        email: new FormControl('',[Validators.required,
                                   SpaceValidator.onlyContainSpace,
                                   Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$') ]),
        password: new FormControl('', [Validators.required])
      })
    })
  }

  get email(){
    return this.formParentGroup.get('user.email')
  }

  get password(){
    return this.formParentGroup.get('user.password')
  }


  signup(){
    if(this.formParentGroup.invalid){
      this.formParentGroup.markAllAsTouched();
      return;
    }
    this.authenticationService.createUser(
      this.formParentGroup.controls['user'].value.email,
      this.formParentGroup.controls['user'].value.password).subscribe({
           next: response =>{
             if(response.result == 1){
               sessionStorage.setItem("emailActive",this.formParentGroup.controls['user'].value.email)
              this.router.navigateByUrl("/active")
             }else{
              alert("Email is Exists");
             }

              }
                                          })

  }

}
