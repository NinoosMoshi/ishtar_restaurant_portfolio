1- create Category and Order class,
   relationship is : one Category has many orders,and many orders have one category.

2- application.properties</br>
3- create Category and Order repository</br>
4- create Category and Order service</br>
5- get all Category and add @JsonIgnore into Category class</br>
http://localhost:8080/api/allCategories </br></br>
<span>note:</span>
<p>if you are not put @JsonIgnore into the Category class you get an error when you try to retrieve all categories, the problem called a cycle</p>

![Getting Started](./img/JsonIgnore.png)

6- get all Orders <br />
http://localhost:8080/api/allOrders  <br />

................................................................................................................

Angular <br />
1- create model package and Category,Order class. <br />
2- create order service <br />
3- create order component

Spring <br />
<p>add corsOrigin in the main class </p>

Angular <br />
1- create component order-list and change design <br />
2- create component category-list <br />
3- create service category <br />
4- create routes <br />

Spring <br />
![Getting Started](./img/findByCategory.png)
1- create method findOrderByCategoryId in orderRepository<br />
2- create method in orderService<br />
3- create method in orderController<br />

Angular <br />
1- create method findOrdersByCategoryId in order service<br />
2- create method in order component<br />
3- create routerLink and activatedRouterLink<br />
4- create dropdown-menu component<br />

Spring<br />
1- create <span style="color:green;">findOrderByOrderNameContaining</span> in order repository.<br />
2- create <span style="color:green;">getOrdersByKey</span> in order service.<br />
3- create <span style="color:green;">getOrderByKey</span> in order controller.<br />
4- test <span style="color:blue;">http://localhost:8080/api/order-key?key=f </span> <br />

Angular
1- write path in app-routing.module.ts <br />
2- create getOrdersByKey in order service <br />
3- create search component <br />

Angular<br />
1- create order-detail component <br />

Spring<br />
![Getting Started](./img/findByOrderId.png) <br />
1- create <span style="color:green;">getOrder</span> in order service<br />
2- create <span style="color:green;">getOrderById</span> in order controller<br />
3- <span style="color:blue;">http://localhost:8080/api/order?id=3 </span><br />

Angular<br />
1- create <span style="color:green;">getOrderById</span> in orderService.<br />
2- create <span style="color:green;">getOrderByOrderId</span>in order component</br />
3- get order in order-details.html component<br />

Angular<br/>
<h2>pagination</h2> <br/>
1- to add pagination into bootstrap(for angular9 and up) we have to use <span style="color:gray;">ng add @angular/localize</span><br />
2- add also <span style="color:gray;">npm install @ng-bootstrap/ng-bootstrap</span><br />
3- in app.module.ts in import section add <span style="color:gray;">NgbPaginationModule</span><br />

![Getting Started](./img/pagination.png) <br />

Spring<br />
1- apply Pageable to the methods in controller,service,repository.<br />
![Getting Started](./img/spring-controller.png) <br />
![Getting Started](./img/spring-service&repository.png) <br />

Angular<br/>
1- change method's path, to add page and size in orderService.<br/>
![Getting Started](./img/pageExplain.png) <br />
![Getting Started](./img/getSizeOfOrders.png) <br />


Angular<br />
1- [maxSize]="3"  its mean size of pagination<br/>
2-[boundaryLinks]="true" it's the arrow to go first or last<br/>
3- create size for pagination <br/>

Angular<br/>
1- create cart-status component<br/>
explain:<br/>
![Getting Started](./img/cartExplain.png) <br />

Explain <h1>CartService</h1> <br/>
![Getting Started](./img/explain-CartService.png) <br />

![Getting Started](./img/console.log) <br />

2- calculate total quantity and total price<br/>
3- create <span style="color:green;">calculateTotals()</span> method in cartService<br/>
4- <span>Note</span> <br/>
in component, when we get the method we have to subscribe that method.<br/>
<span style="color:red;">
but to subscribe variables we have to change the type of these variables. ex:<br/>
totalPrice:number = 0;<br/>
it will be <br/>
totalPrice: Subject<number> = new Subject<number>()<br/>
and to invoke them<br/>
this.totalPrice = totalOfPrice;<br/>
it will be<br/>
this.totalPrice.next(totalOfPrice);<br/>
</span
<br/>

5- create addToCart method in order-details<br/>
6- calculate total price and total size<br/>
7 - add 'No Order Found' in order-list and purchases html component<br />
8- add increaseOrder() into purchases component<br />
9- to decrease orders<br/>
Explain:<br/>
![Getting Started](./img/explain-removeOrder.png) <br />

10- add removeOrders methods in purchases<br/>
11- handle remove button in purchases component<br/>
12- handle check out in purchases<br/>


Angular<br/>
1- create check-out component<br/>
2- create router path for check-out in purchases<br/>

Angular<br/>
1- explain form group<br/>
![Getting Started](./img/formGroup.PNG) <br />

2- form group (parent and child)<br/>
![Getting Started](./img/Form(parent&child).PNG) <br />
<div>
  1- create parent group <span style="color: green">checkOutParentGroup!: FormGroup;</span> <br/>
  2- put <span style="color: green">[formGroup]="checkOutParentGroup"</span> in
     parent div<br/>
  3- import ReactiveFormsModel<br/>
  4- to build a child group inside parent group <span style="color: green">private formChildGroup: FormBuilder</span><br/>  
  5- parentGroup = childgroup div and childgroup div has inputs group as well.<br/>
  6- give child group div a name<br/>
  7- give a name for inputs<br/>
</div>
3- to submit <form (ngSubmit)="done()"></form><br/>
4- to print values of child, <span style="color: green">console.log(this.checkOutParentGroup.get('data')?.value);</span><br/>
5- to print one value of one child, <span style="color: green">console.log(this.checkOutParentGroup.get('data.fullName')?.value);</span><br/>

Spring<br/>
create state and city(model,repository,service,controller).<br/>

Angular<br/>
create state and city(model,service,ts,html)<br/>

Spring<br/>
when we choose a specific state ex(il), we will get cities that belong to (il) state (like Niles, Skokie)<br/>
so we want to return a cities based on state, in CityRepository: <span style="color:green;">public List<City> findByState_StateCode(String code);</span>

Angular<br/>
To explain select box in Form<br/>
![Getting Started](./img/selectForm.png) <br />
![Getting Started](./img/selectInForm.PNG) <br />

Angular<br/>
<h2>Validation</h2><br/>
1-change <span style="color:blue;"> fullName:['']</span>with<span style="color:blue;"> fullName: new FormControl('',[Validators.required,
Validators.minLength(6)]),</span> <br/>

2- Angular create alert for validation<br/>
![Getting Started](./img/validation.PNG) <br />

3- totalPrice and totalSize in checkout component<br/>
change Subject to BehaviorSubject in cartService to get totalPrice and totalSize in checkout<br/>

Spring<br/>
Explain how to save Form in MySql <br/>
![Getting Started](./img/saveFormInMysql.png) <br />

![Getting Started](./img/FormMysql.PNG) <br />
![Getting Started](./img/FormMysql1.png) <br />

1- create model class(customer, item,request,address and relationship).<br/>
2- create dto (FormRequest and FormResponse).<br/>
3- create CustomerRepository,PurchaseService and PurchaseServiceImpl<br/>
4- create PurchaseController<br/>
5- test<br/>

 <p>
 {
 "customer":{
             "fullName":"ninos moshi",
             "email"   :"ninos@yahoo.com",
             "phoneNumber":"2243546534"
             },
  "fromAddress":{
              "state":"il",
              "city":"Niles",
              "street":"2354 n chester st",
              "zipCode":"60714"
                },
  "toAddress":{
              "state":"il",
              "city":"Niles",
              "street":"4444 n main st",
              "zipCode":"60714"
               },
   "requestOrder":{
                "totalPrice": "10.00",
                "totalQuantity": "2"
                 },
   "items":[
             {
                "image":"food/cheeseBurger",
                "quantity":1,
                "price":5.00
              },
              {
                 "image":"food/spainBurger",
                 "quantity":1,
                 "price":5.00
              }
           ]

}
</p><br/>

Angular<br/>
1- create form model(request,item,.....)<br/>
![Getting Started](./img/angularFormModel.png) <br />
2- create PurchaseService<br/>
3- Handle purchases in check-out <br/>
4- save Form <br/>

Spring Security<br/>
1- add dependency <br/>
2- spring security config<br/>
3- explain CSRF <br/>
![Getting Started](./img/security-config.png) <br />
![Getting Started](./img/csrf.png) <br />
![Getting Started](./img/user_Authority_DB.png) <br />

<h2>GrantedAuthority : </h2>
it's mean what the user or admin can do(permission).
example: let's say **user** can just read, the <span style="color:red;">Read is</span> a <span style="color:red;">GrantedAuthority</span>,
and **admin** can <span style="color:red;">read,write,delete,update</span> these <span style="color:red;">are GrantedAuthority</span>.


<h2>Role :</h2>
example <span style="color:red;">USER_ROLE</span> , <span style="color:red;">ADMIN_ROLE</span> , <span style="color:red;">MANAGER_ROLE</span>
<br/>

4- create User and Authorities classes<br/>
5- create relationship between user and authorities<br/>
![Getting Started](./img/security-relationship.PNG) <br />
