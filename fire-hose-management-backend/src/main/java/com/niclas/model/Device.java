package com.niclas.model;

import com.niclas.transfer.DeviceRequest;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document( "devices" )
public class Device extends AuditModel {

    @Id
    private ObjectId id;

    private String deviceName;

    private String deviceId;

    private boolean isPrimary;


    public Device() {
    }

    public Device( String deviceName, String deviceId, boolean isPrimary ) {
        this.deviceName = deviceName;
        this.deviceId = deviceId;
        this.isPrimary = isPrimary;
    }

    public static Device createDevice( DeviceRequest deviceRequest ) {
        return new Device( deviceRequest.getDeviceName(), deviceRequest.getDeviceId(), deviceRequest.isPrimary() );
    }


    public String getId() {
        return id.toHexString();
    }


    public void setId( ObjectId id ) {
        this.id = id;
    }


    public String getDeviceName() {
        return deviceName;
    }


    public void setDeviceName( String component ) {
        this.deviceName = component;
    }


    public String getDeviceId() {
        return deviceId;
    }


    public void setDeviceId( String deviceId ) {
        this.deviceId = deviceId;
    }


    public boolean getIsPrimary() {
        return isPrimary;
    }


    public void setIsPrimary( boolean primary ) {
        this.isPrimary = primary;
    }

}

