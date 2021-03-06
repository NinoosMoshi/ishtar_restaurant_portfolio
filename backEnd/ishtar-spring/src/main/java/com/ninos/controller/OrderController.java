package com.ninos.controller;

import com.ninos.model.Order;
import com.ninos.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {

    private OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }


    // http://localhost:8080/api/allOrders
//    @GetMapping("/allOrders")
//    public List<Order> getOrders(){
//        return orderService.allOrders();
//    }

    // http://localhost:8080/api/allOrders?page={value}&size={value}
    @GetMapping("/allOrders")
    public List<Order> getOrders(@RequestParam int page, @RequestParam int size){
        return orderService.allOrders(page,size);
    }



    // http://localhost:8080/api/category?id={value}&page={value}&size={value}
    @GetMapping("/category")
    public List<Order> getAllOrderByCategoryId(@RequestParam Long id,@RequestParam int page, @RequestParam int size){
        return orderService.getOrdersByCategoryId(id,page,size);
    }

    // http://localhost:8080/api/order-key?key={value}&page={value}&size={value}
    @GetMapping("/order-key")
    public List<Order> getOrderByKey(@RequestParam String key,@RequestParam int page, @RequestParam int size){
       return orderService.getOrdersByKey(key,page,size);
    }


    // http://localhost:8080/api/order?id={value}
    @GetMapping("/order")
    public Order getOrderById(@RequestParam Long id){
        return orderService.getOrder(id);
    }

    // http://localhost:8080/api/order-size
    @GetMapping("/order-size")
    public Long orderSize(){
        return orderService.getAllOrdersSize();
    }


   // http://localhost:8080/api/category-size?id={value}
    @GetMapping("/category-size")
    public Long getOrderByCategorySize(@RequestParam Long id){
        return orderService.getOrderByCategoryIdLength(id);
    }

    // http://localhost:8080/api/key-size?key={value}
   @GetMapping("/key-size")
   public Long getOrderByKeySize(@RequestParam String key){
        return orderService.getOrderByKeyLength(key);
   }






}
