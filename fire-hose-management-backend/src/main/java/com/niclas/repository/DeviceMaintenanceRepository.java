package com.niclas.repository;

import com.niclas.model.DeviceMaintenance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface DeviceMaintenanceRepository extends JpaRepository<DeviceMaintenance, Long> {

    Optional<DeviceMaintenance> findDeviceMaintenanceById( long id );

    List<DeviceMaintenance> findAllByOrderByIdDesc();
}
