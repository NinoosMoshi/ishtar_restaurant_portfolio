package com.ninos.repository;

import com.ninos.model.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {

    public Page<Order> findOrderByCategoryId(Long id, Pageable pageable);

    public Page<Order> findOrderByOrderNameContaining(String orderName, Pageable pageable);


    @Query("select count (id) from Order where category.id=?1")
    public Long getOrderLengthByCategoryId(Long id);


    @Query("select count (id) from Order where orderName like %?1%")
    public Long getOrderLengthByKeySearch(String key);

}
