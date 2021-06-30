1- create Category and Order class,
   relationship is : one Category has many orders,and many orders have one category.

2- application.properties</br>
3- create Category and Order repository</br>
4- create Category and Order service</br>
5- get all Category and add @JsonIgnore into Category class</br>
http://localhost:8080/api/allCategories </br>
note:
if you are not put @JsonIgnore into the Category class you get an error when you try to retrieve all categories, the problem called a cycle</br>

<img src="./img/JsonIgnore.png"/> </br>


