import { Router } from '@angular/router';
import { CartOrder } from './../../model/cart-order';
import { Address } from './../../model/form/address';
import { Customer } from './../../model/form/customer';

import { CartService } from './../../services/cart.service';
import { StateCityService } from './../../services/state-city.service';
import { City } from './../../model/city';
import { State } from './../../model/state';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SpaceValidator } from 'src/app/model/space-validator';
import { Request } from './../../model/form/request';
import { Item } from './../../model/form/item';
import {PurchaseRequest} from './../../model/form/purchase-request'
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  totalCheckOutPrice: number = 0;
  totalCheckOutSize: number = 0;
  states: State[] = [];
  citiesFromPerson: City[] = [];
  citiesToPerson: City[] = [];
  checkOutParentGroup!: FormGroup;

  constructor(private formChildGroup: FormBuilder,
              private stateCityService: StateCityService,
              private cartService: CartService,
              private purchaseService: PurchaseService,
              private router: Router) { }

  ngOnInit(): void {
     this.myForm();
     this.getStates();
     this.getTotal();
    // this.getCities();
    // this.getCitiesByCode();
  }

  myForm(){
    this.checkOutParentGroup = this.formChildGroup.group({
      data:this.formChildGroup.group({
        fullName: new FormControl('',[Validators.required,
                                      SpaceValidator.onlyContainSpace,
                                      Validators.minLength(6)]),

        email: new FormControl('',[Validators.required,
                                   Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$') ]),
        phoneNumber: new FormControl('',[
                                    Validators.required,
                                    Validators.minLength(10),
                                    Validators.maxLength(10),
                                    Validators.pattern('^[0-9]*$')
        ])
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


  get fullName(){
    return this.checkOutParentGroup.get('data.fullName');
  }

  get email(){
    return this.checkOutParentGroup.get('data.gmail');
  }

  get phoneNumber(){
    return this.checkOutParentGroup.get('data.phoneNumber');
  }


  done(){
    if(this.checkOutParentGroup.invalid){
      this.checkOutParentGroup.markAllAsTouched();
    }else{
      let customer = this.checkOutParentGroup.controls['data'].value;

      let fromAddress = this.checkOutParentGroup.controls['fromPerson'].value;
      fromAddress.city = fromAddress.city['cityName'];

      let toAddress = this.checkOutParentGroup.controls['toPerson'].value;
      toAddress.city = toAddress.city['cityName'];

      let requestOrder = new Request();
      requestOrder.totalPrice = this.totalCheckOutPrice;
      requestOrder.totalQuantity = this.totalCheckOutSize;
      let items: Item[] = [];
      let orders: CartOrder[] = this.cartService.orders;
      // for(let i=0; i< orders.length;i++){
      //   items[i] = new Item(orders[i]);
      // }
      items = orders.map(order => new Item(order));


      let purchaseRequest = new PurchaseRequest();
      purchaseRequest.customer = customer;
      purchaseRequest.fromAddress = fromAddress;
      purchaseRequest.toAddress = toAddress;
      purchaseRequest.requestOrder = requestOrder;
      purchaseRequest.items = items;
      this.purchaseService.getOrder(purchaseRequest).subscribe({
        next: response =>{
          alert("Your name is: "+ response.customerName + "\nYour code is: "+ response.code);
          this.cleanForm();
        },
        error: error =>{
           console.log("error is : "+ error.message)
        }
      })

    }

  }

  cleanForm(){
    this.cartService.orders = [];
    this.cartService.totalSize.next(0);
    this.cartService.totalPrice.next(0);
    this.checkOutParentGroup.reset();
    this.router.navigateByUrl('/orders')
  }

  similarGroup(event: Event){
    if((<HTMLInputElement>event.target).checked){
      this.checkOutParentGroup.controls.toPerson.setValue(this.checkOutParentGroup.controls.fromPerson.value);
      this.citiesToPerson = this.citiesFromPerson;
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




  getCitiesByCode(type: string){
    let code = this.checkOutParentGroup.get(`${type}.state`)?.value;
    this.stateCityService.getCitiesByStateCode(code).subscribe(
      data =>{
         if(type === 'fromPerson'){
           this.citiesFromPerson = data
         }else{
           this.citiesToPerson = data
         }
         this.checkOutParentGroup.get(`${type}.city`)?.setValue(data[0]); // to show the first city in select when you choose a state
      }
    )
  }




   getTotal(){
      this.cartService.totalPrice.subscribe(
        data =>{
          this.totalCheckOutPrice = data;
        }
      )
      this.cartService.totalSize.subscribe(
        data =>{
          this.totalCheckOutSize = data
        }
      )
   }



}
