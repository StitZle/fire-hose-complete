package com.niclas.repository;

import com.niclas.model.Order;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.Instant;
import java.util.List;


public interface OrderRepository extends MongoRepository<Order, ObjectId> {

    List<Order> findAllByOrderByIdDesc();

    List<Order> findAllByCreatedAtBetween( Instant startDate, Instant endDate );

    Order findById( long id );

}

