package com.niclas.model;

import com.fasterxml.jackson.databind.JsonNode;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document( "departments" )
public class Department extends AuditModel {

    @Id
    private ObjectId id;

    private String department;

    private String forename;

    private String surname;

    private String mail;

    private String street;

    private String houseNumber;

    private String location;

    private String postalCode;

    private String country;

    private boolean registered;


    public Department() {
    }

    public Department( String department, String forename, String surname, String mail, String street, String houseNumber, String location, String postalCode, String country, boolean registered ) {
        this.department = department;
        this.forename = forename;
        this.surname = surname;
        this.mail = mail;
        this.street = street;
        this.houseNumber = houseNumber;
        this.location = location;
        this.postalCode = postalCode;
        this.country = country;
        this.registered = registered;
    }

    public Department( JsonNode jsonNode ) {
        this.department = jsonNode.get( "department" ).asText();
        this.forename = jsonNode.get( "forename" ).asText();
        this.surname = jsonNode.get( "surname" ).asText();
        this.mail = jsonNode.get( "mail" ).asText();
        this.street = jsonNode.get( "street" ).asText();
        this.houseNumber = jsonNode.get( "houseNumber" ).asText();
        this.location = jsonNode.get( "location" ).asText();
        this.postalCode = jsonNode.get( "postalCode" ).asText();
        this.country = jsonNode.get( "country" ).asText();
        this.registered = jsonNode.get( "registered" ).asBoolean();
    }


    public String getId() {
        return id.toHexString();
    }

    public void setId( ObjectId id ) {
        this.id = id;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment( String departmentName ) {
        this.department = departmentName;
    }

    public String getForename() {
        return forename;
    }

    public void setForename( String forename ) {
        this.forename = forename;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname( String contactPersonSurname ) {
        this.surname = contactPersonSurname;
    }

    public String getMail() {
        return mail;
    }

    public void setMail( String contactPersonMail ) {
        this.mail = contactPersonMail;
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
}
