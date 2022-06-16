package com.niclas.transfer;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotBlank;


public class DepartmentRequest {

    @NotBlank
    @JsonProperty( "departmentName" )
    private String departmentName;

    @NotBlank
    @JsonProperty( "contact" )
    private ContactOrderRequest contactOrderRequest;

    @NotBlank
    @JsonProperty( "street" )
    private String street;

    @NotBlank
    @JsonProperty( "houseNumber" )
    private String houseNumber;

    @NotBlank
    @JsonProperty( "location" )
    private String location;

    @NotBlank
    @JsonProperty( "postalCode" )
    private String postalCode;

    @NotBlank
    @JsonProperty( "country" )
    private String country;

    @NotBlank
    @JsonProperty( "registered" )
    private boolean registered;

    @NotBlank
    @JsonProperty( "sendConfirmationMail" )
    private boolean sendConfirmationMail;

    public DepartmentRequest() {
    }

    public DepartmentRequest( String departmentName, ContactOrderRequest contactOrderRequest, String street, String houseNumber, String location, String postalCode, String country, boolean registered, boolean sendConfirmationMail ) {
        this.departmentName = departmentName;
        this.contactOrderRequest = contactOrderRequest;
        this.street = street;
        this.houseNumber = houseNumber;
        this.location = location;
        this.postalCode = postalCode;
        this.country = country;
        this.registered = registered;
        this.sendConfirmationMail = sendConfirmationMail;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName( String departmentName ) {
        this.departmentName = departmentName;
    }

    public ContactOrderRequest getContactRequest() {
        return contactOrderRequest;
    }

    public void setContactRequest( ContactOrderRequest contactOrderRequest ) {
        this.contactOrderRequest = contactOrderRequest;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet( String street ) {
        this.street = street;
    }

    public String getHouseNumber() {
        return houseNumber;
    }

    public void setHouseNumber( String houseNumber ) {
        this.houseNumber = houseNumber;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation( String location ) {
        this.location = location;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode( String postalCode ) {
        this.postalCode = postalCode;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry( String country ) {
        this.country = country;
    }

    public boolean isRegistered() {
        return registered;
    }

    public void setRegistered( boolean registered ) {
        this.registered = registered;
    }

    public boolean getSendConfirmationMail() {
        return sendConfirmationMail;
    }

    public void setSendConfirmationMail( boolean sendConfirmationMail ) {
        this.sendConfirmationMail = sendConfirmationMail;
    }
}
