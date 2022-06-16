package com.niclas.repository;

import com.niclas.model.Order;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Date;
import java.util.List;


public interface OrderRepository extends MongoRepository<Order, ObjectId> {

    List<Order> findAllByOrderByIdDesc();

    List<Order> findAllByCreatedAtBetween( Date startDate, Date endDate );

    Order findById( long id );

}

