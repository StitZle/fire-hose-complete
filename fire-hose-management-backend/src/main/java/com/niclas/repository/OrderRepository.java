package com.niclas.repository;

import com.niclas.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findAllByOrderByIdDesc();
    List<Order> findAllByCreatedAtBetween(Date startDate, Date endDate);
    List<Order> findAllByMonthAndYear(int month, int year);
    Order findById(long id);

}

