package com.ninos.service;

import com.ninos.model.Order;
import com.ninos.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private OrderRepository orderRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }


    public List<Order> allOrders(int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        return orderRepository.findAll(pageable).getContent();
    }

    public List<Order> getOrdersByCategoryId(Long id,int page, int size){
        Pageable pageable = PageRequest.of(page, size);
         return orderRepository.findOrderByCategoryId(id,pageable).getContent();
    }

    public List<Order> getOrdersByKey(String key,int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        return orderRepository.findOrderByOrderNameContaining(key,pageable).getContent();
    }

    public Order getOrder(Long id){
       return orderRepository.findById(id).get();
    }


    public Long getAllOrdersSize(){
        return orderRepository.count();
    }


    public Long getOrderByCategoryIdLength(Long id){
        return orderRepository.getOrderLengthByCategoryId(id);
    }


    public Long getOrderByKeyLength(String key){
        return orderRepository.getOrderLengthByKeySearch(key);
    }

}









