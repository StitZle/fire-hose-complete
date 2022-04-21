package com.niclas.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.niclas.model.Maintenance;
import com.niclas.service.MaintenanceService;
import com.niclas.utils.MaintenanceDeviceDto;


@RestController
public class MaintenanceController {

    private final MaintenanceService maintenanceService;


    @Autowired
    public MaintenanceController( MaintenanceService maintenanceService ) {
        this.maintenanceService = maintenanceService;
    }


    @GetMapping( value = "/maintenance-devices-templates" )
    public ResponseEntity<List<MaintenanceDeviceDto>> getAllMaintenanceDevices() {
        List<MaintenanceDeviceDto> maintenanceDeviceDtos = maintenanceService.getNewMaintenanceDevices();
        return new ResponseEntity<>( maintenanceDeviceDtos, HttpStatus.OK );
    }


    @GetMapping( value = "/maintenance-devices" )
    public ResponseEntity<List<Maintenance>> getAllDeviceMaintenances() {
        List<Maintenance> maintenances = maintenanceService.getAllDeviceMaintenances();
        return new ResponseEntity<>( maintenances, HttpStatus.OK );
    }


    @PostMapping( value = "/maintenance-devices" )
    public ResponseEntity<Maintenance> addDevice( @RequestBody Maintenance maintenance ) {

        Maintenance savedMaintenance = maintenanceService.addMaintenance( maintenance );
        return new ResponseEntity<>( savedMaintenance, HttpStatus.CREATED );
    }

}
