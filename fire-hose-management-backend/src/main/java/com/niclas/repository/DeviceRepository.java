package com.niclas.repository;

import com.niclas.model.Device;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DeviceRepository extends JpaRepository<Device, Long> {

    Device findDeviceByDeviceName(String deviceName);

    Optional<Device> findDeviceById(long id);

    List<Device> findAllByOrderByIdDesc();

}
