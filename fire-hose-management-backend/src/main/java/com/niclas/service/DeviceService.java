package com.niclas.service;

import com.niclas.model.Device;
import com.niclas.repository.DeviceRepository;
import com.niclas.rest.exceptionHandling.exception.DeviceNotFoundException;
import com.niclas.transfer.DeviceRequest;
import com.niclas.utils.Generators;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DeviceService {

    private final int DEVICE_ID_LENGTH = 6;

    private final DeviceRepository deviceRepository;

    @Autowired
    public DeviceService( DeviceRepository deviceRepository ) {
        this.deviceRepository = deviceRepository;
    }

    public Device addDevice( DeviceRequest deviceRequest ) {
        Device device = Device.createDevice( deviceRequest );

        if( device.getDeviceId() == null ) {
            device.setDeviceId( Generators.generateDeviceId( DEVICE_ID_LENGTH ) );
        }
        deviceRepository.save( device );
        return device;
    }

    public List<Device> getAllDevices() {
        return deviceRepository.findAllByOrderByIdDesc();
    }

    public Device updateDevice( DeviceRequest deviceRequest, ObjectId id ) throws DeviceNotFoundException {
        Device device = deviceRepository.findDeviceById( id ).orElseThrow( () -> new DeviceNotFoundException( id ) );

        device.setDeviceName( deviceRequest.getDeviceName() );
        device.setIsPrimary( deviceRequest.isPrimary() );

        if( deviceRequest.getDeviceId().equals( "" ) || deviceRequest.getDeviceId() == null ) {
            device.setDeviceId( Generators.generateDeviceId( DEVICE_ID_LENGTH ) );
        }
        else {
            device.setDeviceId( deviceRequest.getDeviceId() );
        }
        deviceRepository.save(device);
        return device;
    }

    public void deleteDevice( ObjectId id ) {
        deviceRepository.deleteById( id );
    }

}
