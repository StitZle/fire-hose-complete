package com.niclas.rest.controller;

import com.niclas.model.DeviceMaintenance;
import com.niclas.service.MaintenanceDeviceService;
import com.niclas.utils.MaintenanceDeviceDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class MaintenanceDeviceController {

    private final MaintenanceDeviceService maintenanceDeviceService;

    @Autowired
    public MaintenanceDeviceController( MaintenanceDeviceService maintenanceDeviceService ) {
        this.maintenanceDeviceService = maintenanceDeviceService;
    }

    @GetMapping( value = "/maintenance-devices-template" )
    public ResponseEntity<List<MaintenanceDeviceDto>> getAllMaintenanceDevices() {
        List<MaintenanceDeviceDto> maintenanceDeviceDtos = maintenanceDeviceService.getNewMaintenanceDevices();
        return new ResponseEntity<>( maintenanceDeviceDtos, HttpStatus.OK );
    }

    @GetMapping( value = "/maintenance-devices" )
    public ResponseEntity<List<DeviceMaintenance>> getAllDeviceMaintenances() {
        List<DeviceMaintenance> deviceMaintenances = maintenanceDeviceService.getAllDeviceMaintenances();
        return new ResponseEntity<>( deviceMaintenances, HttpStatus.OK );
    }

    @PostMapping( value = "/maintenance-devices" )
    public ResponseEntity<DeviceMaintenance> addDevice( @RequestBody DeviceMaintenance deviceMaintenance ) {

        DeviceMaintenance savedDeviceMaintenance = maintenanceDeviceService.addDeviceMaintenance( deviceMaintenance );
        return new ResponseEntity<>( savedDeviceMaintenance, HttpStatus.CREATED );
    }

}
