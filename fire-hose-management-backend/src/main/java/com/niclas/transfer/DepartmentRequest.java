package com.niclas.transfer;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotBlank;


public class DepartmentRequest {

    @NotBlank
    @JsonProperty( "departmentName" )
    private String departmentName;

    @NotBlank
    @JsonProperty( "contact" )
    private ContactRequest contactRequest;

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

    public DepartmentRequest( String departmentName, ContactRequest contactRequest, String street, String houseNumber, String location, String postalCode, String country, boolean registered, boolean sendConfirmationMail ) {
        this.departmentName = departmentName;
        this.contactRequest = contactRequest;
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

    public ContactRequest getContactRequest() {
        return contactRequest;
    }

    public String getStreet() {
        return street;
    }

    public String getHouseNumber() {
        return houseNumber;
    }

    public String getLocation() {
        return location;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public String getCountry() {
        return country;
    }

    public boolean isRegistered() {
        return registered;
    }

    public boolean getSendConfirmationMail() {
        return sendConfirmationMail;
    }
}
