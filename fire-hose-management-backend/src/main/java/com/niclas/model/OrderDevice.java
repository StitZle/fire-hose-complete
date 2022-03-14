package com.niclas.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table( name = "order_devices" )
public class OrderDevice {

    @Id
    @Column( name = "id" )
    @GeneratedValue( strategy = GenerationType.AUTO ) //TODO better config for GenerationType
    private long id;

    @Column( name = "order_id", insertable = false, updatable = false )
    private String orderId;

    @Column( name = "device_id" )
    private String deviceId;

    @Column( name = "device_name" )
    private String deviceName;

    @Column( name = "count" )
    private int count;


    public OrderDevice() {
    }


    public OrderDevice( String deviceId, String deviceName, int count )
    {
        this.deviceId = deviceId;
        this.deviceName = deviceName;
        this.count = count;
    }


    public long getId() {
        return id;
    }


    public void setId( long id ) {
        this.id = id;
    }


    public String getOrderId() {
        return orderId;
    }


    public void setOrderId( String orderId ) {
        this.orderId = orderId;
    }


    public String getDeviceId()
    {
        return deviceId;
    }


    public void setDeviceId( String deviceId )
    {
        this.deviceId = deviceId;
    }


    public String getDeviceName() {
        return deviceName;
    }


    public void setDeviceName( String deviceName ) {
        this.deviceName = deviceName;
    }


    public int getCount() {
        return count;
    }


    public void setCount( int count ) {
        this.count = count;
    }
}




