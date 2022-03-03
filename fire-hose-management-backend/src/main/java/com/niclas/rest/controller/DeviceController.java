package com.niclas.rest.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.niclas.model.Device;
import com.niclas.repository.DeviceRepository;
import com.niclas.utils.DeviceIdGenerator;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@RestController
public class DeviceController {

    //TODO add Logging

    private final DeviceIdGenerator deviceIdGenerator;

    private final DeviceRepository deviceRepository;


    public DeviceController( DeviceRepository deviceRepository, DeviceIdGenerator deviceIdGenerator ) {
        this.deviceRepository = deviceRepository;
        this.deviceIdGenerator = deviceIdGenerator;
    }


    @PostMapping( "/devices/" )
    public ResponseEntity<Device> addDevice( @RequestBody Device device ) {
        if( device.getDeviceId().equals( "" ) ) {
            device.setDeviceId( deviceIdGenerator.generate( 6 ) );
        }
        deviceRepository.save( device );

        return new ResponseEntity<>( device, HttpStatus.CREATED );
    }


    @GetMapping( "/devices/" )
    public ResponseEntity<List<Device>> getAllDevices() {
        List<Device> departmentList = deviceRepository.findAllByOrderByIdDesc();
        return new ResponseEntity<>( departmentList, HttpStatus.OK );
    }


    @PutMapping( "/devices/{id}" )
    public ResponseEntity<Device> editDevice( @PathVariable( value = "id" ) long id,
            @RequestBody Device updatedDevice ) {

        Device device = deviceRepository.findDepartmentById( id );
        device.setDeviceName( updatedDevice.getDeviceName() );
        device.setIsPrimary( updatedDevice.getIsPrimary() );

        if( updatedDevice.getDeviceId().equals( "" ) || updatedDevice.getDeviceId() == null ) {
            device.setDeviceId( deviceIdGenerator.generate( 6 ) );
        }
        else {
            device.setDeviceId( updatedDevice.getDeviceId() );
        }

        deviceRepository.save( device );

        return new ResponseEntity<>( device, HttpStatus.OK );
    }


    @DeleteMapping( "/devices/{id}" )
    public ResponseEntity deleteComponent( @PathVariable( value = "id" ) long id ) {

        deviceRepository.deleteById( id );

        return new ResponseEntity<>( HttpStatus.OK );
    }

}
