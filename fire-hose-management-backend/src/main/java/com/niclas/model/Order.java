package com.niclas.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


@Document( "orders" )
public class Order extends AuditModel {

    @Id
    private ObjectId id;

    private String orderId;

    private Department department;

    private OrderContact orderContact;

    private List<OrderDevice> devices;

    private String senderFirstname;

    private String senderLastname;

    private String notes;


    public Order() {
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


    public Department getDepartment() {
        return department;
    }


    public void setDepartment( Department department ) {
        this.department = department;
    }


    public OrderContact getOrderContact() {
        return orderContact;
    }


    public void setOrderContact( OrderContact orderContact ) {
        this.orderContact = orderContact;
    }


    public List<OrderDevice> getDevices() {
        return devices;
    }


    public void setDevices( List<OrderDevice> devices ) {
        this.devices = devices;
    }


    public String getSenderFirstname() {
        return senderFirstname;
    }


    public void setSenderFirstname( String senderFirstname ) {
        this.senderFirstname = senderFirstname;
    }


    public String getSenderLastname() {
        return senderLastname;
    }


    public void setSenderLastname( String senderLastname ) {
        this.senderLastname = senderLastname;
    }


    public String getNotes() {
        return notes;
    }


    public void setNotes( String notes ) {
        this.notes = notes;
    }
}