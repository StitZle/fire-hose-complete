package com.niclas.model;

import com.niclas.transfer.DepartmentRequest;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;


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

    private Date deletionDate;

    private boolean deleted;

    public Department() {
    }

    public Department( String departmentName, Contact contact, String street, String houseNumber, String location, String postalCode, String country, boolean registered, boolean sendConfirmationMail, Date deletionDate, boolean deleted ) {
        this.departmentName = departmentName;
        this.contact = contact;
        this.street = street;
        this.houseNumber = houseNumber;
        this.location = location;
        this.postalCode = postalCode;
        this.country = country;
        this.registered = registered;
        this.sendConfirmationMail = sendConfirmationMail;
        this.deletionDate = deletionDate;
        this.deleted = deleted;
    }

    public static Department createDepartment( DepartmentRequest departmentRequest ) {
        return new Department( departmentRequest.getDepartmentName(), new Contact( departmentRequest.getContactRequest().getFirstname(), departmentRequest.getContactRequest().getLastname(), departmentRequest.getContactRequest().getGender(), departmentRequest.getContactRequest().getMail() ), departmentRequest.getStreet(), departmentRequest.getHouseNumber(), departmentRequest.getLocation(), departmentRequest.getPostalCode(), departmentRequest.getCountry(), true, departmentRequest.getSendConfirmationMail(), null, false );
    }

    // TODO exclude this from Request
    public String getContactFullName() {
        return this.contact.getFirstname() + " " + this.contact.getLastname();
    }


    public ObjectId getId() {
        return id;
    }


    public void setId( ObjectId id ) {
        this.id = id;
    }


    public String getDepartmentName() {
        return departmentName;
    }


    public void setDepartmentName( String departmentName ) {
        this.departmentName = departmentName;
    }


    public Contact getContact() {
        return contact;
    }


    public void setContact( Contact contact ) {
        this.contact = contact;
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


    public boolean isSendConfirmationMail() {
        return sendConfirmationMail;
    }


    public void setSendConfirmationMail( boolean sendConfirmationMail ) {
        this.sendConfirmationMail = sendConfirmationMail;
    }

    public Date getDeletionDate() {
        return deletionDate;
    }

    public void setDeletionDate( Date deletionDate ) {
        this.deletionDate = deletionDate;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted( boolean deleted ) {
        this.deleted = deleted;
    }
}
