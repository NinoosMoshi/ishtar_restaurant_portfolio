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
    @GetMapping("/allOrders")
    public List<Order> getOrders(){
        return orderService.allOrders();
    }


    // http://localhost:8080/api/category?id={value}
    @GetMapping("/category")
    public List<Order> getAllOrderByCategoryId(@RequestParam Long id){
        return orderService.getOrdersByCategoryId(id);
    }

    // http://localhost:8080/api/order-key?key={value}
    @GetMapping("/order-key")
    public List<Order> getOrderByKey(@RequestParam String key){
       return orderService.getOrdersByKey(key);
    }

}
