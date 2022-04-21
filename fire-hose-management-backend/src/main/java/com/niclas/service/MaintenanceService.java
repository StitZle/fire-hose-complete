package com.niclas.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.niclas.model.Device;
import com.niclas.model.Maintenance;
import com.niclas.repository.DeviceMaintenanceRepository;
import com.niclas.repository.DeviceRepository;
import com.niclas.utils.MaintenanceDeviceDto;


@Component
public class MaintenanceService {

    private final DeviceMaintenanceRepository deviceMaintenanceRepository;

    private final DeviceRepository deviceRepository;


    @Autowired
    public MaintenanceService( DeviceRepository deviceRepository,
            DeviceMaintenanceRepository deviceMaintenanceRepository ) {
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


    public Maintenance addMaintenance( Maintenance maintenance ) {
        maintenance.setMaintenanceId( UUID.randomUUID() );
        Maintenance savedMaintenance = deviceMaintenanceRepository.save( maintenance );
        return savedMaintenance;
    }


    public List<Maintenance> getAllDeviceMaintenances() {
        List<Maintenance> maintenances = deviceMaintenanceRepository.findAllByOrderByIdDesc();
        return maintenances;
    }

}
