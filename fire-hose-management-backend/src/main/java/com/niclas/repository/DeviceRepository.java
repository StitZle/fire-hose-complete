package com.niclas.repository;

import com.niclas.model.Device;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;


public interface DeviceRepository extends MongoRepository<Device, ObjectId> {

    Device findDeviceByDeviceName( String deviceName );

    Optional<Device> findDeviceById( ObjectId id );

    List<Device> findAllByOrderByIdDesc();

}
