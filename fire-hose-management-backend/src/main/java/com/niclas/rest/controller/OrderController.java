package com.niclas.rest.controller;

import com.niclas.model.Order;
import com.niclas.rest.exceptionHandling.exception.DepartmentNotFoundException;
import com.niclas.rest.exceptionHandling.exception.OrderParamsOverload;
import com.niclas.service.OrderService;
import com.niclas.transfer.Delivery;
import com.niclas.transfer.OrderRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;
import java.util.List;


@Slf4j
@RestController
public class OrderController {

    private final OrderService orderService;

    public OrderController( OrderService orderService ) {
        this.orderService = orderService;
    }

    @PostMapping( value = "/orders" )
    public ResponseEntity<Order> addOrder( @RequestBody OrderRequest orderRequest ) throws OrderParamsOverload, DepartmentNotFoundException {
        Order order = orderService.addOrder( orderRequest );
        return new ResponseEntity<>( order, HttpStatus.CREATED );
    }


    @GetMapping( value = "/orders" )
    public ResponseEntity<List<Delivery>> getAllOrdersBetweenDates( @RequestParam( required = false ) @DateTimeFormat( iso = DateTimeFormat.ISO.DATE_TIME ) Instant startDate, @RequestParam( required = false ) @DateTimeFormat( iso = DateTimeFormat.ISO.DATE_TIME ) Instant endDate ) {
        //TODO add if not found custom Response
        //TODO add default range (1 Year)
        List<Delivery> orderList = orderService.getAllOrdersBetweenDates( startDate, endDate );
        return new ResponseEntity<>( orderList, HttpStatus.OK );
    }


    //TODO move this to other file
    private static Date nextDay( Date date ) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime( date );
        calendar.add( Calendar.DATE, 1 );
        return calendar.getTime();
    }


    private static LocalDateTime dateToLocalDateTime( Date date ) {
        return LocalDateTime.ofInstant( date.toInstant(), ZoneId.systemDefault() );
    }


    private static Date localDateTimeToDate( LocalDateTime localDateTime ) {
        return Date.from( localDateTime.atZone( ZoneId.systemDefault() ).toInstant() );
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
