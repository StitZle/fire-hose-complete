package com.niclas.model;

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


    public Department() {
    }


    public String getId()
    {
        return id.toHexString();
    }


    public void setId( ObjectId id )
    {
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
