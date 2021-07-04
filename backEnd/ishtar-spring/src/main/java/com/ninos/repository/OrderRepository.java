package com.ninos.repository;

import com.ninos.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {

    public List<Order> findOrderByCategoryId(Long id);

    public List<Order> findOrderByOrderNameContaining(String orderName);

}
