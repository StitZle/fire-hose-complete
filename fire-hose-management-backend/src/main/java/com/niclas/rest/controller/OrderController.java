package com.niclas.rest.controller;

import com.niclas.model.Order;
import com.niclas.repository.DepartmentRepository;
import com.niclas.repository.OrderRepository;
import com.niclas.utils.OrderStatus;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Slf4j
@RestController
public class OrderController {

    private final DepartmentRepository departmentRepository;

    private final OrderRepository orderRepository;


    public OrderController( OrderRepository orderRepository, DepartmentRepository departmentRepository ) {
        this.orderRepository = orderRepository;
        this.departmentRepository = departmentRepository;
    }


    /*@PostMapping( "/orders/add" )
    public ResponseEntity<Order> addOrder( @RequestBody JsonNode jsonNode ) {
        Order order = new Order();

        JsonNode departmentJson = jsonNode.get( "department" );
        Department department;
        if( departmentJson.get( "id" ).canConvertToInt() ) {
            department = departmentRepository.findDepartmentById( departmentJson.get( "id" ).asInt() );
        }
        else {
            department = new Department( departmentJson );
        }
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
        order.setOrderId( order.generateOrderId() );

        orderRepository.save( order );
        return new ResponseEntity<>( order, HttpStatus.CREATED );
    }
*/

    @GetMapping( "orders" )
    public ResponseEntity<List<Order>> getAllOrdersBetweenDates(
            @RequestParam @DateTimeFormat( pattern = "dd/MM/yyyy" ) Date startDate,
            @RequestParam @DateTimeFormat( pattern = "dd/MM/yyyy" ) Date endDate ) {
        //TODO add if not found custom Response
        List<Order> orderList = orderRepository.findAllByCreatedAtBetween( startDate, endDate );
        return new ResponseEntity<>( orderList, HttpStatus.OK );
    }


    /*@GetMapping( "/orders/get/specific" )
    public ResponseEntity<List<Order>> getOrderForMonthAndYear( @RequestParam int month, @RequestParam int year ) {
        //TODO add if not found custom Response
        List<Order> orderList = orderRepository.findAllByMonthAndYear( month, year );
        return new ResponseEntity<>( orderList, HttpStatus.OK );
    }*/


    @GetMapping( "orders/order-status/get" )
    public ResponseEntity<Map<String, String>> getOrderStatus() {
        HashMap<String, String> map = new HashMap<>();
        for( OrderStatus orderStatus : OrderStatus.values() ) {
            map.put( orderStatus.name(), orderStatus.getStatus() );
        }

        return new ResponseEntity<>( map, HttpStatus.OK );
    }


}


/*
@PutMapping("/orders/update/order-status/{id}")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable(value = "id") long id, @RequestBody JsonNode jsonNode) throws OrderStatusNotFoundException {
        Order order = orderRepository.findById(id);

        OrderStatus orderStatus = Stream.of(OrderStatus.values())
                .filter(s -> s.getStatus().equals(jsonNode.get("status").asText()))
                .findFirst()
                .orElseThrow(OrderStatusNotFoundException::new);

        orderRepository.save(order);

        return new ResponseEntity<>(order, HttpStatus.OK);
    }





*/

//        order.setOrderId(order.generateOrderId());
//
//        DateTime dateTime = new DateTime();
//        order.setMonth(dateTime.getMonthOfYear());
//        order.setYear(dateTime.getYear());
//
//        order.getDevices().forEach(orderDevice -> {
//            orderDevice.setOrderId(order.getOrderId());
//        });


//departmentRepository.save(order.getDepartment());
//orderDeviceRepository.saveAll(order.getDevices());
