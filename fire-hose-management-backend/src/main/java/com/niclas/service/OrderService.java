package com.niclas.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.JsonNode;
import com.niclas.model.Department;
import com.niclas.model.Order;
import com.niclas.model.OrderDevice;
import com.niclas.repository.OrderRepository;
import com.niclas.utils.Generators;


@Component
public class OrderService {

    private final OrderRepository orderRepository;


    public OrderService( OrderRepository orderRepository ) {
        this.orderRepository = orderRepository;
    }


    public Order addOrder( JsonNode jsonNode ) {
        Order order = new Order();

        JsonNode departmentJson = jsonNode.get( "department" );
        Department department = new Department( departmentJson );
        order.setDepartment( department );

        List<OrderDevice> orderDevices = new ArrayList<>();
        JsonNode devices = jsonNode.get( "deviceList" );
        for( JsonNode node : devices ) {
            if( node.has( "count" ) && node.get( "count" ).asInt() != 0 ) {
                orderDevices.add( new OrderDevice( node, order.getOrderId() ) );
            }
        }
        order.setDevices( orderDevices );

        order.setSenderForename( jsonNode.get( "forename" ).asText() );
        order.setSenderSurname( jsonNode.get( "surname" ).asText() );
        order.setNotes( jsonNode.get( "notes" ).asText() );
        order.setOrderId( Generators.generateOrderId() );

        orderRepository.save( order );
        return order;
    }


    public List<Order> getAllOrdersBetweenDates( Date startDate, Date endDate ) {
        return orderRepository.findAllByCreatedAtBetween( startDate, endDate );
    }

}
