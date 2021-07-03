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
1- create method findOrderByCategoryId in orderRepository<br />
2- create method in orderService<br />
3- create method in orderController<br />