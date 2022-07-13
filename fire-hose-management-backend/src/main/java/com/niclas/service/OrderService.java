package com.niclas.service;

import com.niclas.mail.SendMail;
import com.niclas.model.Department;
import com.niclas.model.Order;
import com.niclas.model.OrderContact;
import com.niclas.model.OrderDevice;
import com.niclas.repository.DepartmentRepository;
import com.niclas.repository.OrderRepository;
import com.niclas.rest.exceptionHandling.exception.DepartmentNotFoundException;
import com.niclas.rest.exceptionHandling.exception.OrderParamsOverload;
import com.niclas.transfer.Delivery;
import com.niclas.transfer.OrderRequest;
import com.niclas.transfer.OrderRequestDevice;
import com.niclas.utils.Generators;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
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


    public List<Delivery> getAllOrdersBetweenDates( Instant startDate, Instant endDate ) {

        //fallbacks
        if( startDate == null ) {
            startDate = Instant.now().minus( 30, ChronoUnit.DAYS ).truncatedTo( ChronoUnit.DAYS );

        }
        if( endDate == null ) {
            endDate = Instant.now();
        }


        List<Order> orders = orderRepository.findAllByCreatedAtBetween( startDate, endDate );

        List<Delivery> deliveries = new ArrayList<>();
        orders.forEach( ( order ) -> {
            Delivery delivery = new Delivery();
            delivery.setId( order.getId() );
            delivery.setOrderId( order.getOrderId() );
            delivery.setDevices( order.getDevices() );
            delivery.setSenderFirstname( order.getSenderFirstname() );
            delivery.setSenderLastname( order.getSenderLastname() );
            delivery.setNotes( order.getNotes() );


            if( order.getDepartmentId() != null ) {
                try {
                    Department department = departmentRepository.findDepartmentById( order.getDepartmentId() ).orElseThrow( () -> new DepartmentNotFoundException( order.getDepartmentId() ) );
                    delivery.setDepartment( department );
                }
                catch( DepartmentNotFoundException e ) {
                    throw new RuntimeException( e );
                }
            }
            else {
                delivery.setOrderContact( order.getOrderContact() );
            }
            deliveries.add( delivery );
        } );
        return deliveries;
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
