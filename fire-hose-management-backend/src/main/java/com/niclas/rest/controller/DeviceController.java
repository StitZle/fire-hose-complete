package com.niclas.rest.controller;

import com.niclas.model.Device;
import com.niclas.rest.exceptionHandling.exception.DeviceNotFoundException;
import com.niclas.service.DeviceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Slf4j
@RestController
public class DeviceController {

    private final DeviceService deviceService;

    @Autowired
    public DeviceController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    @PostMapping("/devices/")
    public ResponseEntity<Device> addDevice(@RequestBody Device deviceRequest) {

        Device device = deviceService.addDevice(deviceRequest);
        return new ResponseEntity<>(device, HttpStatus.CREATED);
    }


    @GetMapping("/devices/")
    public ResponseEntity<List<Device>> getAllDevices() {
        List<Device> devices = deviceService.getAllDevices();
        return new ResponseEntity<>(devices, HttpStatus.OK);
    }


    @PutMapping("/devices/{id}")
    public ResponseEntity<Device> editDevice(@PathVariable(value = "id") long id, @RequestBody Device deviceRequest) throws DeviceNotFoundException {

        Device device = deviceService.updateDevice(deviceRequest, id);
        return new ResponseEntity<>(device, HttpStatus.OK);
    }


    @DeleteMapping("/devices/{id}")
    public ResponseEntity<Object> deleteComponent(@PathVariable(value = "id") long id) {

        deviceService.deleteDevice(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
