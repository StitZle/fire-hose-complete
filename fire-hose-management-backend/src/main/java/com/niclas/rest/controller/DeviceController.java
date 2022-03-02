package com.niclas.rest.controller;

import com.niclas.model.Device;
import com.niclas.repository.DeviceRepository;
import com.niclas.utils.DeviceIdGenerator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
public class DeviceController {

    //TODO add Logging

    private final DeviceIdGenerator deviceIdGenerator;

    private final DeviceRepository deviceRepository;


    public DeviceController(DeviceRepository deviceRepository, DeviceIdGenerator deviceIdGenerator) {
        this.deviceRepository = deviceRepository;
        this.deviceIdGenerator = deviceIdGenerator;
    }


    @PostMapping("/devices/")
    public ResponseEntity<Device> addDevice(@RequestBody Device device) {
        if (device.getDeviceId().equals("")) {
            device.setDeviceId(deviceIdGenerator.generate(6));
        }
        deviceRepository.save(device);

        return new ResponseEntity<>(device, HttpStatus.CREATED);
    }

    @GetMapping("/devices/")
    public ResponseEntity<List<Device>> getAllDevices() {
        List<Device> departmentList = deviceRepository.findAllByOrderByIdDesc();
        return new ResponseEntity<>(departmentList, HttpStatus.OK);
    }

    @PutMapping("/devices/{id}")
    public ResponseEntity<Device> editDevice(@PathVariable(value = "id") long id, @RequestBody Device device) {

        Device oldDevice = deviceRepository.findDepartmentById(id);
        oldDevice.setDeviceName(device.getDeviceName());
        oldDevice.setDeviceId(device.getDeviceId());
        oldDevice.setIsPrimary(device.getIsPrimary());

        deviceRepository.save(oldDevice);

        return new ResponseEntity<>(oldDevice, HttpStatus.OK);
    }


    @DeleteMapping("/devices/{id}")
    public ResponseEntity deleteComponent(@PathVariable(value = "id") long id) {

        deviceRepository.deleteById(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
