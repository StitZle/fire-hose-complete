package com.niclas.model;

import com.niclas.transfer.DepartmentOrderRequest;
import com.niclas.transfer.DepartmentRequest;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document( "departments" )
public class Department extends AuditModel {

    @Id
    private ObjectId id;

    private String departmentName;

    private Contact contact;

    private String street;

    private String houseNumber;

    private String location;

    private String postalCode;

    private String country;

    private boolean registered;

    private boolean sendConfirmationMail;


    public Department( String departmentName, Contact contact, String street, String houseNumber, String location, String postalCode, String country, boolean registered, boolean sendConfirmationMail ) {
        this.departmentName = departmentName;
        this.contact = contact;
        this.street = street;
        this.houseNumber = houseNumber;
        this.location = location;
        this.postalCode = postalCode;
        this.country = country;
        this.registered = registered;
        this.sendConfirmationMail = sendConfirmationMail;
    }


    public static Department createNewDepartment( DepartmentRequest departmentRequest ) {
        return new Department( departmentRequest.getDepartmentName(), new Contact( departmentRequest.getContactRequest().getFirstname(), departmentRequest.getContactRequest().getLastname(), departmentRequest.getContactRequest().getGender(), departmentRequest.getContactRequest().getMail() ), departmentRequest.getStreet(), departmentRequest.getHouseNumber(), departmentRequest.getLocation(), departmentRequest.getPostalCode(), departmentRequest.getCountry(), true, departmentRequest.getSendConfirmationMail() );
    }

    public static Department createDepartment( DepartmentOrderRequest departmentOrderRequest ) {
        return new Department( departmentOrderRequest.getDepartmentName(), new Contact( departmentOrderRequest.getContactRequest().getFirstname(), departmentOrderRequest.getContactRequest().getLastname(), departmentOrderRequest.getContactRequest().getGender(), departmentOrderRequest.getContactRequest().getMail() ), departmentOrderRequest.getStreet(), departmentOrderRequest.getHouseNumber(), departmentOrderRequest.getLocation(), departmentOrderRequest.getPostalCode(), departmentOrderRequest.getCountry(), departmentOrderRequest.isRegistered(), departmentOrderRequest.getSendConfirmationMail() );
    }


    public String getId() {
        return id.toHexString();
    }


    public void setId( ObjectId id ) {
        this.id = id;
    }


    public String getDepartmentName()
    {
        return departmentName;
    }


    public void setDepartmentName( String departmentName )
    {
        this.departmentName = departmentName;
    }


    public Contact getContact()
    {
        return contact;
    }


    public void setContact( Contact contact )
    {
        this.contact = contact;
    }


    public String getStreet()
    {
        return street;
    }


    public void setStreet( String street )
    {
        this.street = street;
    }


    public String getHouseNumber()
    {
        return houseNumber;
    }


    public void setHouseNumber( String houseNumber )
    {
        this.houseNumber = houseNumber;
    }


    public String getLocation()
    {
        return location;
    }


    public void setLocation( String location )
    {
        this.location = location;
    }


    public String getPostalCode()
    {
        return postalCode;
    }


    public void setPostalCode( String postalCode )
    {
        this.postalCode = postalCode;
    }


    public String getCountry()
    {
        return country;
    }


    public void setCountry( String country )
    {
        this.country = country;
    }


    public boolean isRegistered()
    {
        return registered;
    }


    public void setRegistered( boolean registered )
    {
        this.registered = registered;
    }


    public boolean isSendConfirmationMail()
    {
        return sendConfirmationMail;
    }


    public void setSendConfirmationMail( boolean sendConfirmationMail )
    {
        this.sendConfirmationMail = sendConfirmationMail;
    }
}
