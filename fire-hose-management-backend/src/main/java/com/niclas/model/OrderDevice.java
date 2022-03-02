package com.niclas.model;

import com.fasterxml.jackson.databind.JsonNode;

import javax.persistence.*;

@Entity
@Table(name = "order_devices")
public class OrderDevice extends AuditModel {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO) //TODO better config for GenerationType
    private long id;


    @Column(name = "order_id", insertable = false, updatable = false)
    private String orderId;

    @Column(name = "device_id")
    private long deviceId;

    @Column(name = "device_name")
    private String deviceName;


    @Column(name = "count")
    private int count;

    public OrderDevice() {
    }


    public OrderDevice(String orderId, long deviceId, String deviceName, int count) {
        this.orderId = orderId;
        this.deviceId = deviceId;
        this.deviceName = deviceName;
        this.count = count;
    }

    public OrderDevice(JsonNode jsonNode, String orderId) {
        this.orderId = orderId;
        this.deviceId = jsonNode.get("id").asLong();
        this.deviceName = jsonNode.get("deviceName").asText();
        this.count = jsonNode.get("count").asInt();

    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public long getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(long deviceId) {
        this.deviceId = deviceId;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }


    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}




