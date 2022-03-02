package com.niclas.repository;

import com.niclas.model.Device;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DeviceRepository extends JpaRepository<Device, Long> {

    Device findDeviceByDeviceName(String deviceName);
    Device findDepartmentById(long id);
    List<Device> findAllByOrderByIdDesc();

}
