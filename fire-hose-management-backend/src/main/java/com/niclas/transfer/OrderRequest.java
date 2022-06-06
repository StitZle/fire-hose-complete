package com.niclas.transfer;

import java.util.List;
import javax.validation.constraints.NotBlank;


public class OrderRequest {

    private DepartmentOrderRequest departmentOrderRequest;

    private ContactOrderRequest contactOrderRequest;

    private List<OrderRequestDevice> orderRequestDeviceList;

    @NotBlank
    private String firstname;

    @NotBlank
    private String lastname;

    private String notes;


    public OrderRequest( DepartmentOrderRequest departmentOrderRequest, ContactOrderRequest contactOrderRequest, List<OrderRequestDevice> orderRequestDeviceList, String firstname, String lastname, String notes ) {
        this.departmentOrderRequest = departmentOrderRequest;
        this.contactOrderRequest = contactOrderRequest;
        this.orderRequestDeviceList = orderRequestDeviceList;
        this.firstname = firstname;
        this.lastname = lastname;
        this.notes = notes;
    }

    public DepartmentOrderRequest getDepartmentOrderRequest() {
        return departmentOrderRequest;
    }

    public void setDepartmentOrderRequest( DepartmentOrderRequest departmentOrderRequest ) {
        this.departmentOrderRequest = departmentOrderRequest;
    }

    public ContactOrderRequest getContactOrderRequest() {
        return contactOrderRequest;
    }

    public void setContactOrderRequest( ContactOrderRequest contactOrderRequest ) {
        this.contactOrderRequest = contactOrderRequest;
    }

    public List<OrderRequestDevice> getOrderRequestDeviceList() {
        return orderRequestDeviceList;
    }

    public void setOrderRequestDeviceList( List<OrderRequestDevice> orderRequestDeviceList ) {
        this.orderRequestDeviceList = orderRequestDeviceList;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname( String firstname ) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname( String lastname ) {
        this.lastname = lastname;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes( String notes ) {
        this.notes = notes;
    }
}
