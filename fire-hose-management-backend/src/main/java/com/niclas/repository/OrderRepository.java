package com.niclas.repository;

import com.niclas.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findAllByOrderByIdDesc();
    List<Order> findAllByCreatedAtBetween(Date startDate, Date endDate);
    Order findById(long id);

}

