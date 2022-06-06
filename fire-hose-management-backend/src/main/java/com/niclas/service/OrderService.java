package com.niclas.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.niclas.mail.MailService;
import com.niclas.model.Department;
import com.niclas.model.Order;
import com.niclas.model.OrderContact;
import com.niclas.model.OrderDevice;
import com.niclas.repository.OrderRepository;
import com.niclas.rest.exceptionHandling.exception.OrderParamsOverload;
import com.niclas.transfer.OrderRequest;
import com.niclas.utils.Generators;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Component
public class OrderService {


    private final OrderRepository orderRepository;

    private final MailService mailService;

    public OrderService( OrderRepository orderRepository, MailService mailService ) {
        this.orderRepository = orderRepository;

        this.mailService = mailService;
    }


    private static final ObjectMapper objectMapper = new ObjectMapper();


    private Order createNewOrder( OrderRequest orderRequest ) {
        Order order = new Order(

        );

        return order;
    }

    public Order addOrder( OrderRequest orderRequest ) throws OrderParamsOverload {
        Order order = new Order();
        order.setOrderId( Generators.generateOrderId() );

        checkForDoubleParams( orderRequest );

        if( orderRequest.getDepartmentOrderRequest() != null ) {
            Department department = Department.createDepartment( orderRequest.getDepartmentOrderRequest() );
            order.setDepartment( department );
        }

        if( orderRequest.getContactOrderRequest() != null ) {
            OrderContact orderContact = objectMapper.treeToValue( orderJson.get( "contact" ), OrderContact.class );
            order.setOrderContact( orderContact );
        }

        order.setDevices( getOrderDevicesFromJson( orderJson.get( "devices" ), order.getOrderId() ) );
        order.setSenderFirstname( orderJson.get( "firstname" ).textValue() );
        order.setSenderLastname( orderJson.get( "lastname" ).textValue() );

        //TODO if no note is set then set this to null
        order.setNotes( orderJson.get( "notes" ).textValue() );

        orderRepository.save( order );
        mailService.buildAndSendOrderConfirmationMail( order );

        return order;
    }


    public List<Order> getAllOrdersBetweenDates( Date startDate, Date endDate ) {
        return orderRepository.findAllByCreatedAtBetween( startDate, endDate );
    }


    private void checkForDoubleParams( OrderRequest orderRequest ) throws OrderParamsOverload {

        if( orderRequest.getDepartmentOrderRequest() != null && orderRequest.getContactRequest() != null ) {
            throw new OrderParamsOverload( "Order cannot have both fields set: department, contact" );
        }

        if( orderRequest.getDepartmentOrderRequest() == null && orderRequest.getContactRequest() == null ) {
            throw new OrderParamsOverload( "Order cannot have both fields null. One field must be set: department or contact" );
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
        orderDevice.setId( new ObjectId() );
        orderDevice.setOrderId( orderId );
        orderDevice.setDeviceId( deviceNode.get( "deviceId" ).asText() );
        orderDevice.setDeviceName( deviceNode.get( "deviceName" ).asText() );
        orderDevice.setCount( deviceNode.get( "count" ).asInt() );
        return orderDevice;
    }

}
