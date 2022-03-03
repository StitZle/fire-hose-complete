package com.niclas.model;

import javax.persistence.*;
import java.util.List;


@Entity
@Table(name = "orders")
public class Order extends AuditModel {


    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO) //TODO better config for GenerationType
    private long id;


    @Column(name = "order_id")
    private String orderId;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "department", referencedColumnName = "id")
    private Department department;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id", referencedColumnName = "order_id")
    private List<OrderDevice> devices;

    @Column(name = "sender_forename")
    private String senderForename;

    @Column(name = "sender_surname")
    private String senderSurname;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;


    public Order() {
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

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public List<OrderDevice> getDevices() {
        return devices;
    }

    public void setDevices(List<OrderDevice> devices) {
        this.devices = devices;
    }

    public String getSenderForename() {
        return senderForename;
    }

    public void setSenderForename(String senderForename) {
        this.senderForename = senderForename;
    }

    public String getSenderSurname() {
        return senderSurname;
    }

    public void setSenderSurname(String senderSurname) {
        this.senderSurname = senderSurname;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}