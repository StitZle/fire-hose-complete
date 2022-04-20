package com.niclas.service;

import com.niclas.model.Device;
import com.niclas.model.DeviceMaintenance;
import com.niclas.repository.DeviceMaintenanceRepository;
import com.niclas.repository.DeviceRepository;
import com.niclas.utils.MaintenanceDeviceDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;


@Component
public class MaintenanceDeviceService {

    private final DeviceMaintenanceRepository deviceMaintenanceRepository;

    private final DeviceRepository deviceRepository;

    @Autowired
    public MaintenanceDeviceService( DeviceRepository deviceRepository, DeviceMaintenanceRepository deviceMaintenanceRepository ) {
        this.deviceRepository = deviceRepository;
        this.deviceMaintenanceRepository = deviceMaintenanceRepository;
    }


    public List<MaintenanceDeviceDto> getNewMaintenanceDevices() {
        List<Device> devices = deviceRepository.findAllByOrderByIdDesc();
        List<MaintenanceDeviceDto> maintenanceDeviceDtos = new ArrayList<>();

        devices.forEach( device -> {
            MaintenanceDeviceDto maintenanceDeviceDto = new MaintenanceDeviceDto( device );
            maintenanceDeviceDtos.add( maintenanceDeviceDto );
        } );

        return maintenanceDeviceDtos;
    }

    public DeviceMaintenance addDeviceMaintenance( DeviceMaintenance deviceMaintenance ) {
        DeviceMaintenance savedDeviceMaintenance = deviceMaintenanceRepository.save( deviceMaintenance );
        return savedDeviceMaintenance;
    }

    public List<DeviceMaintenance> getAllDeviceMaintenances() {
        List<DeviceMaintenance> deviceMaintenances = deviceMaintenanceRepository.findAllByOrderByIdDesc();
        return deviceMaintenances;
    }

}
