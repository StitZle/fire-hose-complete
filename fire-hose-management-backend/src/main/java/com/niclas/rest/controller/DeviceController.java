package com.niclas.rest.controller;

import com.niclas.model.Device;
import com.niclas.rest.exceptionHandling.exception.DeviceNotFoundException;
import com.niclas.service.DeviceService;
import com.niclas.transfer.DeviceRequest;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@Slf4j
@RestController
public class DeviceController {

    private final DeviceService deviceService;


    @Autowired
    public DeviceController( DeviceService deviceService ) {
        this.deviceService = deviceService;
    }


    @PostMapping( value = "/devices", consumes = {MediaType.APPLICATION_JSON_VALUE} )
    public ResponseEntity<Device> addDevice( @RequestBody DeviceRequest deviceRequest ) {

        Device device = deviceService.addDevice( deviceRequest );
        return new ResponseEntity<>( device, HttpStatus.CREATED );
    }


    @GetMapping( value = "/devices" )
    public ResponseEntity<List<Device>> getAllDevices() {

        List<Device> devices = deviceService.getAllDevices();
        return new ResponseEntity<>( devices, HttpStatus.OK );
    }


    @PutMapping( value = "/devices/{id}", consumes = {MediaType.APPLICATION_JSON_VALUE} )
    public ResponseEntity<Device> editDevice( @PathVariable( value = "id" ) ObjectId id, @RequestBody DeviceRequest deviceRequest ) throws DeviceNotFoundException {

        Device device = deviceService.updateDevice( deviceRequest, id );
        return new ResponseEntity<>( device, HttpStatus.OK );
    }


    @DeleteMapping( value = "/devices/{id}" )
    public ResponseEntity<Object> deleteComponent( @PathVariable( value = "id" ) ObjectId id )
            throws DeviceNotFoundException {

        deviceService.deleteDevice( id );
        return new ResponseEntity<>( HttpStatus.OK );
    }
}
