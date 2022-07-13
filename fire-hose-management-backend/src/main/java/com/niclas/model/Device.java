package com.niclas.model;

import com.niclas.transfer.DeviceRequest;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;


@Document( "devices" )
public class Device extends AuditModel {

    @Id
    private ObjectId id;

    private String deviceName;

    private String deviceId;

    private boolean isPrimary;

    private Date deletionDate;

    private boolean deleted;


    public Device() {
    }

    public Device( String deviceName, String deviceId, boolean isPrimary, Date deletionDate, boolean deleted ) {
        this.deviceName = deviceName;
        this.deviceId = deviceId;
        this.isPrimary = isPrimary;
        this.deletionDate = deletionDate;
        this.deleted = deleted;
    }

    public static Device createDevice( DeviceRequest deviceRequest ) {
        return new Device( deviceRequest.getDeviceName(), deviceRequest.getDeviceId(), deviceRequest.isPrimary(), null, false );
    }


    public ObjectId getId() {
        return id;
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


    public Date getDeletionDate() {
        return deletionDate;
    }


    public void setDeletionDate( Date deletionDate ) {
        this.deletionDate = deletionDate;
    }


    public boolean isDeleted() {
        return deleted;
    }


    public void setDeleted( boolean deleted ) {
        this.deleted = deleted;
    }
}

