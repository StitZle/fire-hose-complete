package com.niclas.service;

import com.niclas.model.Device;
import com.niclas.repository.DeviceRepository;
import com.niclas.rest.exceptionHandling.exception.DeviceNotFoundException;
import com.niclas.utils.DeviceIdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DeviceService {

    private final int DEVICE_ID_LENGTH = 6;

    private final DeviceIdGenerator deviceIdGenerator;

    private final DeviceRepository deviceRepository;

    @Autowired
    public DeviceService(DeviceRepository deviceRepository, DeviceIdGenerator deviceIdGenerator) {
        this.deviceRepository = deviceRepository;
        this.deviceIdGenerator = deviceIdGenerator;
    }

    public Device addDevice(Device device) {
        if (device.getDeviceId().equals("")) {
            device.setDeviceId(deviceIdGenerator.generate(DEVICE_ID_LENGTH));
        }
        deviceRepository.save(device);
        return device;
    }

    public List<Device> getAllDevices() {
        return deviceRepository.findAllByOrderByIdDesc();
    }

    public Device updateDevice(Device deviceRequest, long id) throws DeviceNotFoundException {
        Device device = deviceRepository.findDeviceById(id).orElseThrow(() -> new DeviceNotFoundException(id));

        device.setDeviceName(deviceRequest.getDeviceName());
        device.setIsPrimary(deviceRequest.getIsPrimary());

        if (deviceRequest.getDeviceId().equals("") || deviceRequest.getDeviceId() == null) {
            device.setDeviceId(deviceIdGenerator.generate(DEVICE_ID_LENGTH));
        } else {
            device.setDeviceId(deviceRequest.getDeviceId());
        }
        deviceRepository.save(device);
        return device;
    }

    public void deleteDevice(long id) {
        deviceRepository.deleteById(id);
    }

}
