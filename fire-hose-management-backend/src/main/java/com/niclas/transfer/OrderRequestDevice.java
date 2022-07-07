package com.niclas.transfer;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.bson.types.ObjectId;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;


public class OrderRequestDevice {

    @NotBlank
    @JsonProperty( "id" )
    private ObjectId id;

    @NotBlank
    @JsonProperty( "deviceName" )
    private String deviceName;

    @JsonProperty( "deviceId" )
    private String deviceId;

    @NotNull
    @JsonProperty( "isPrimary" )
    private boolean isPrimary;

    @NotNull
    @Min( 1 )
    @JsonProperty( "count" )
    private int count;

    public OrderRequestDevice() {
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

    public void setDeviceName( String deviceName ) {
        this.deviceName = deviceName;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId( String deviceId ) {
        this.deviceId = deviceId;
    }

    public boolean isPrimary() {
        return isPrimary;
    }

    public void setPrimary( boolean primary ) {
        isPrimary = primary;
    }

    public int getCount() {
        return count;
    }

    public void setCount( int count ) {
        this.count = count;
    }
}
