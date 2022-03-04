package com.niclas.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.niclas.model.Department;
import com.niclas.model.Order;
import com.niclas.model.OrderContact;
import com.niclas.model.OrderDevice;
import com.niclas.repository.OrderRepository;
import com.niclas.rest.exceptionHandling.exception.OrderParamsOverload;
import com.niclas.utils.Generators;


@Component
public class OrderService {

    private final OrderRepository orderRepository;


    public OrderService( OrderRepository orderRepository ) {
        this.orderRepository = orderRepository;
    }


    private static final ObjectMapper objectMapper = new ObjectMapper();


    public Order addOrder( JsonNode orderJson ) throws JsonProcessingException, OrderParamsOverload {
        Order order = new Order();
        order.setOrderId( Generators.generateOrderId() );

        checkForDoubleParams( orderJson );

        if( orderJson.hasNonNull( "department" ) ) {
            Department department = objectMapper.treeToValue( orderJson.get( "department" ), Department.class );
            order.setDepartment( department );
        }

        if( orderJson.hasNonNull( "contact" ) ) {
            OrderContact orderContact = objectMapper.treeToValue( orderJson.get( "contact" ), OrderContact.class );
            order.setOrderContact( orderContact );
        }

        order.setDevices( getOrderDevicesFromJson( orderJson.get( "devices" ), order.getOrderId() ) );
        order.setSenderForename( orderJson.get( "forename" ).asText() );
        order.setSenderSurname( orderJson.get( "surname" ).asText() );
        order.setNotes( orderJson.get( "notes" ).asText() );

        orderRepository.save( order );
        return order;
    }


    public List<Order> getAllOrdersBetweenDates( Date startDate, Date endDate ) {
        return orderRepository.findAllByCreatedAtBetween( startDate, endDate );
    }


    private void checkForDoubleParams( JsonNode orderJson ) throws OrderParamsOverload {
        if( orderJson.hasNonNull( "department" ) && orderJson.hasNonNull( "contact" ) ) {
            throw new OrderParamsOverload( "Order cannot have both fields set: department, contact" );
        }

        if( !orderJson.hasNonNull( "department" ) && !orderJson.hasNonNull( "contact" ) ) {
            throw new OrderParamsOverload(
                    "Order cannot have both fields null. One field must be set: department, contact" );
        }
    }


    private List<OrderDevice> getOrderDevicesFromJson( JsonNode deviceNodes, String orderId ) {
        List<OrderDevice> devices = new ArrayList<>();
        for( JsonNode node : deviceNodes ) {
            OrderDevice orderDevice = buildOrderDevice( node, orderId );
            devices.add( orderDevice );
        }
        return devices;
    }


    private OrderDevice buildOrderDevice( JsonNode deviceNode, String orderId ) {
        OrderDevice orderDevice = new OrderDevice();
        orderDevice.setOrderId( orderId );
        orderDevice.setDeviceId( deviceNode.get( "id" ).asLong() );
        orderDevice.setDeviceName( deviceNode.get( "deviceName" ).asText() );
        orderDevice.setCount( deviceNode.get( "count" ).asInt() );
        return orderDevice;
    }

}
