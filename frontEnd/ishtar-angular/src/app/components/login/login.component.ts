import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/security/authentication.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SpaceValidator } from 'src/app/model/space-validator';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formParentGroup!: FormGroup;

  constructor(private formChildGroup: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router,
              private authService: SocialAuthService) { }

  ngOnInit(): void {
    this.myLoginForm();
  }


  myLoginForm(){
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


  login(){
    if(this.formParentGroup.invalid){
       this.formParentGroup.markAllAsTouched();
       return;
    }

    this.authenticationService.userActive(
      this.formParentGroup.controls['user'].value.email,
      this.formParentGroup.controls['user'].value.password
    ).subscribe({
      next: response =>{
        let ac = response.active;
        if(ac == 1){
          this.authenticationService.executeAuthentication(this.formParentGroup.controls['user'].value.email,
          this.formParentGroup.controls['user'].value.password).subscribe({
          next: response =>{
          this.router.navigateByUrl("/orders")
           }
          })
        }else if(ac == 0) {
          sessionStorage.setItem("emailActive",this.formParentGroup.controls['user'].value.email)
           this.router.navigateByUrl("/active")
        }else{
          alert("Invalid Credentails")
        }
      }
    })

  }




  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      data =>{
        console.log(data)
      }
    );


  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      data =>{
        console.log(data)
      }
    );
  }




}
