package com.niclas.model;

import javax.persistence.*;

@Entity
@Table(name = "Devices")
public class Device extends AuditModel {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO) //TODO better config for GenerationType
    private long id;

    @Column(name = "device_name")
    private String deviceName;

    @Column(name = "device_id")
    private String deviceId;

    @Column(name = "is_primary")
    private boolean isPrimary;


    public Device() {
    }

    public Device(String deviceName, String deviceId, boolean isPrimary) {
        this.deviceName = deviceName;
        this.deviceId = deviceId;
        this.isPrimary = isPrimary;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public void setDeviceName(String component) {
        this.deviceName = component;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public boolean getIsPrimary() {
        return isPrimary;
    }

    public void setIsPrimary(boolean primary) {
        this.isPrimary = primary;
    }

}
