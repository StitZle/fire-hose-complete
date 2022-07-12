package com.niclas.service;

import com.niclas.mail.SendMail;
import com.niclas.model.Order;
import com.niclas.model.OrderContact;
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

    private final DepartmentRepository departmentRepository;

    private final SendMail sendMail;

    public OrderService( OrderRepository orderRepository, DepartmentRepository departmentRepository,
            SendMail sendMail ) {
        this.orderRepository = orderRepository;
        this.departmentRepository = departmentRepository;
        this.sendMail = sendMail;
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

         if( orderRequest.getOrderContactRequest() != null ) {
            OrderContact orderContact = OrderContact.createOrderContact( orderRequest.getOrderContactRequest() );
            order.setOrderContact( orderContact );
        }

        order.setDevices( buildOrderDeviceList( orderRequest.getOrderRequestDeviceList() ) );
        order.setSenderFirstname( orderRequest.getSenderFirstname() );
        order.setSenderLastname( orderRequest.getSenderLastname() );
        order.setNotes( orderRequest.getNotes() );


        orderRepository.save( order );
        sendMail.sendMail( order );

        return order;
    }


    public List<Order> getAllOrdersBetweenDates( Date startDate, Date endDate ) {
        return orderRepository.findAllByCreatedAtBetween( startDate, endDate );
    }


    private void checkForDoubleParams( OrderRequest orderRequest ) throws OrderParamsOverload {
        if( orderRequest.getDepartmentId() != null && orderRequest.getOrderContactRequest() != null ) {
            throw new OrderParamsOverload( "Order cannot have both fields set: department, contact" );
        }

        if( orderRequest.getDepartmentId() == null && orderRequest.getOrderContactRequest() == null ) {
            throw new OrderParamsOverload( "Order cannot have both fields null. One field must be set: department or contact" );
        }
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
