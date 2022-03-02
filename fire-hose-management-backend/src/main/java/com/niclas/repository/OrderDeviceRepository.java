package com.niclas.repository;

import com.niclas.model.OrderDevice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderDeviceRepository extends JpaRepository<OrderDevice, Long> {

    List<OrderDevice> findAllByOrderByIdDesc();
}
