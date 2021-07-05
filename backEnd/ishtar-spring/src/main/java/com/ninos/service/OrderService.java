package com.ninos.service;

import com.ninos.model.Order;
import com.ninos.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private OrderRepository orderRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }


    public List<Order> allOrders(){
        return orderRepository.findAll();
    }

    public List<Order> getOrdersByCategoryId(Long id){
         return orderRepository.findOrderByCategoryId(id);
    }

    public List<Order> getOrdersByKey(String key){
        return orderRepository.findOrderByOrderNameContaining(key);
    }

    public Order getOrder(Long id){
       return orderRepository.findById(id).get();
    }

}









