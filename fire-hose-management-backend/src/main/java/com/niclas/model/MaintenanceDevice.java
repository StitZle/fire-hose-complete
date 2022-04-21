package com.niclas.model;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table
public class MaintenanceDevice extends AuditModel {

    @Id
    @Column( name = "id" )
    @GeneratedValue( strategy = GenerationType.AUTO ) //TODO better config for GenerationType
    private long id;

    @Column( name = "maintenance_id", insertable = false, updatable = false )
    private UUID maintenanceId;

    @Column( name = "device_name" )
    private String deviceName;

    @Column( name = "device_id" )
    private String deviceId;

    @Column( name = "is_primary" )
    private boolean isPrimary;

    @Column( name = "maintained" )
    private int maintained;

    @Column( name = "discarded" )
    private int discarded;


    public MaintenanceDevice() {
    }


    public long getId() {
        return id;
    }


    public void setId( long id ) {
        this.id = id;
    }


    public UUID getMaintenanceId() {
        return maintenanceId;
    }


    public void setMaintenanceId( UUID maintenanceId ) {
        this.maintenanceId = maintenanceId;
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


    public int getMaintained() {
        return maintained;
    }


    public void setMaintained( int maintained ) {
        this.maintained = maintained;
    }


    public int getDiscarded() {
        return discarded;
    }


    public void setDiscarded( int discarded ) {
        this.discarded = discarded;
    }
}
