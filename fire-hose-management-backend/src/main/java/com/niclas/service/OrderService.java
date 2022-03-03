package com.niclas.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.niclas.model.Order;
import com.niclas.repository.DepartmentRepository;
import com.niclas.repository.OrderRepository;
import org.springframework.stereotype.Component;

@Component
public class OrderService {

    private final DepartmentRepository departmentRepository;

    private final OrderRepository orderRepository;


    public OrderService(OrderRepository orderRepository, DepartmentRepository departmentRepository) {
        this.orderRepository = orderRepository;
        this.departmentRepository = departmentRepository;
    }

    public Order addOrder(JsonNode jsonNode) {

    }

}
