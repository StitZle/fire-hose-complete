package com.niclas.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;


public class OrderDevice extends AuditModel {

    @Id
    private ObjectId id;

    private String orderId;

    private String deviceId;

    private String deviceName;

    private int count;


    public OrderDevice() {
    }


    public OrderDevice( String deviceId, String deviceName, int count ) {
        this.deviceId = deviceId;
        this.deviceName = deviceName;
        this.count = count;
    }


    public String getId() {
        return id.toHexString();
    }


    public void setId( ObjectId id ) {
        this.id = id;
    }


    public String getOrderId() {
        return orderId;
    }


    public void setOrderId( String orderId ) {
        this.orderId = orderId;
    }


    public String getDeviceId() {
        return deviceId;
    }


    public void setDeviceId( String deviceId ) {
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




