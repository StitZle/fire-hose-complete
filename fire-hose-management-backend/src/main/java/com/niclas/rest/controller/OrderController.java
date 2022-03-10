package com.niclas.rest.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.niclas.model.Order;
import com.niclas.rest.exceptionHandling.exception.OrderParamsOverload;
import com.niclas.service.OrderService;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@RestController
public class OrderController {

    private final OrderService orderService;


    @Autowired
    public OrderController( OrderService orderService ) {
        this.orderService = orderService;
    }


    @PostMapping( value = "/orders")
    public ResponseEntity<Order> addOrder( @RequestBody JsonNode orderNode )
            throws JsonProcessingException, OrderParamsOverload {
        Order order = orderService.addOrder( orderNode );
        return new ResponseEntity<>( order, HttpStatus.CREATED );
    }


    @GetMapping( value = "/orders" )
    public ResponseEntity<List<Order>> getAllOrdersBetweenDates(
            @RequestParam @DateTimeFormat( pattern = "dd/MM/yyyy" ) Date startDate,
            @RequestParam @DateTimeFormat( pattern = "dd/MM/yyyy" ) Date endDate ) {
        //TODO add if not found custom Response
        List<Order> orderList = orderService.getAllOrdersBetweenDates( startDate, endDate );
        return new ResponseEntity<>( orderList, HttpStatus.OK );
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

@GetMapping( "/orders/get/specific" )
    public ResponseEntity<List<Order>> getOrderForMonthAndYear( @RequestParam int month, @RequestParam int year ) {
        //TODO add if not found custom Response
        List<Order> orderList = orderRepository.findAllByMonthAndYear( month, year );
        return new ResponseEntity<>( orderList, HttpStatus.OK );
    }

    @GetMapping( "orders/order-status/get" )
    public ResponseEntity<Map<String, String>> getOrderStatus() {
        HashMap<String, String> map = new HashMap<>();
        for( OrderStatus orderStatus : OrderStatus.values() ) {
            map.put( orderStatus.name(), orderStatus.getStatus() );
        }

        return new ResponseEntity<>( map, HttpStatus.OK );
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
