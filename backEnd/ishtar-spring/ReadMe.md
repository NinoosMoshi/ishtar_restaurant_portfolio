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
