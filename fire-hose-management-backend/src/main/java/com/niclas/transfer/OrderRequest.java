package com.niclas.transfer;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.bson.types.ObjectId;

import java.util.List;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;


public class OrderRequest {

    @JsonProperty( "departmentId" )
    private ObjectId departmentId;

    @JsonProperty( "contact" )
    private OrderContactRequest orderContactRequest;

    @Min( 1 )
    @JsonProperty( "devices" )
    private List<OrderRequestDevice> orderRequestDeviceList;

    @NotBlank
    @JsonProperty( "senderFirstname" )
    private String senderFirstname;

    @NotBlank
    @JsonProperty( "senderLastname" )
    private String senderLastname;

    @JsonProperty( "notes" )
    private String notes;


    public OrderRequest() {
    }


    public OrderRequest( ObjectId departmentId, OrderContactRequest orderContactRequest, List<OrderRequestDevice> orderRequestDeviceList, String senderFirstname, String senderLastname, String notes ) {
        this.departmentId = departmentId;
        this.orderContactRequest = orderContactRequest;
        this.orderRequestDeviceList = orderRequestDeviceList;
        this.senderFirstname = senderFirstname;
        this.senderLastname = senderLastname;
        this.notes = notes;
    }


    public ObjectId getDepartmentId() {
        return departmentId;
    }


    public void setDepartmentId( ObjectId departmentId ) {
        this.departmentId = departmentId;
    }


    public OrderContactRequest getOrderContactRequest() {
        return orderContactRequest;
    }


    public void setContactOrderRequest( OrderContactRequest orderContactRequest ) {
        this.orderContactRequest = orderContactRequest;
    }


    public List<OrderRequestDevice> getOrderRequestDeviceList() {
        return orderRequestDeviceList;
    }


    public void setOrderRequestDeviceList( List<OrderRequestDevice> orderRequestDeviceList ) {
        this.orderRequestDeviceList = orderRequestDeviceList;
    }


    public String getSenderFirstname() {
        return senderFirstname;
    }


    public void setFirstname( String senderFirstname ) {
        this.senderFirstname = senderFirstname;
    }


    public String getSenderLastname() {
        return senderLastname;
    }


    public void setLastname( String senderLastname ) {
        this.senderLastname = senderLastname;
    }


    public String getNotes() {
        return notes;
    }


    public void setNotes( String notes ) {
        this.notes = notes;
    }
}
