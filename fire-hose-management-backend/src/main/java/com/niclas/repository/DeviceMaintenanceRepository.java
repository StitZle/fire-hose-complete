package com.niclas.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.niclas.model.Maintenance;


public interface DeviceMaintenanceRepository extends JpaRepository<Maintenance, Long> {

    Optional<Maintenance> findDeviceMaintenanceById( long id );


    List<Maintenance> findAllByOrderByIdDesc();
}
