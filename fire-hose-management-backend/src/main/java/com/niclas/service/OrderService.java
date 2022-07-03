package com.niclas.service;

import com.niclas.mail.MailService;
import com.niclas.model.Order;
import com.niclas.model.OrderDevice;
import com.niclas.repository.DepartmentRepository;
import com.niclas.repository.OrderRepository;
import com.niclas.rest.exceptionHandling.exception.DepartmentNotFoundException;
import com.niclas.rest.exceptionHandling.exception.OrderParamsOverload;
import com.niclas.transfer.OrderRequest;
import com.niclas.transfer.OrderRequestDevice;
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

    private final DepartmentRepository departmentRepository;

    public OrderService( OrderRepository orderRepository, MailService mailService, DepartmentRepository departmentRepository ) {
        this.orderRepository = orderRepository;

        this.mailService = mailService;
        this.departmentRepository = departmentRepository;
    }

    public Order addOrder( OrderRequest orderRequest ) throws OrderParamsOverload, DepartmentNotFoundException {
        Order order = new Order();
        order.setOrderId( Generators.generateOrderId() );

        checkForDoubleParams( orderRequest );

        ObjectId departmentId = orderRequest.getDepartmentId();
        if( departmentId != null ) {
            departmentRepository.findDepartmentByIdAndDeletedIsFalse( departmentId ).orElseThrow( () -> new DepartmentNotFoundException( departmentId ) );
            order.setDepartmentId( departmentId );
        }

        order.setDevices( buildOrderDeviceList( orderRequest.getOrderRequestDeviceList() ) );
        order.setSenderFirstname( orderRequest.getSenderFirstname() );
        order.setSenderLastname( order.getSenderLastname() );
        order.setNotes( orderRequest.getNotes() );

       /* if( orderRequest.getContactOrderRequest() != null ) {
            OrderContact orderContact = objectMapper.treeToValue( orderJson.get( "contact" ), OrderContact.class );
            order.setOrderContact( orderContact );
        }*/

        orderRepository.save( order );
        //mailService.buildAndSendOrderConfirmationMail( order );

        return order;
    }


    public List<Order> getAllOrdersBetweenDates( Date startDate, Date endDate ) {
        return orderRepository.findAllByCreatedAtBetween( startDate, endDate );
    }


    private void checkForDoubleParams( OrderRequest orderRequest ) throws OrderParamsOverload {

        /*if( orderRequest.getDepartmentOrderRequest() != null && orderRequest.getContactRequest() != null ) {
            throw new OrderParamsOverload( "Order cannot have both fields set: department, contact" );
        }

        if( orderRequest.getDepartmentOrderRequest() == null && orderRequest.getContactRequest() == null ) {
            throw new OrderParamsOverload( "Order cannot have both fields null. One field must be set: department or contact" );
        }*/
    }

    private List<OrderDevice> buildOrderDeviceList( List<OrderRequestDevice> orderRequestDeviceList ) {
        List<OrderDevice> orderDeviceList = new ArrayList<>();
        orderRequestDeviceList.forEach( orderRequestDevice -> {
            OrderDevice orderDevice = OrderDevice.createOrderDevice( orderRequestDevice );
            orderDeviceList.add( orderDevice );
        } );
        return orderDeviceList;
    }
}
