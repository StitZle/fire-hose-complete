package com.niclas.transfer;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;


public class DeviceRequest {

    @NotBlank
    @JsonProperty( "deviceName" )
    private String deviceName;

    @JsonProperty( "deviceId" )
    private String deviceId;

    @NotNull
    @JsonProperty( "isPrimary" )
    private boolean isPrimary;

    public DeviceRequest() {
    }

    public DeviceRequest( String deviceName, String deviceId, boolean isPrimary ) {
        this.deviceName = deviceName;
        this.deviceId = deviceId;
        this.isPrimary = isPrimary;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public boolean isPrimary() {
        return isPrimary;
    }
}
