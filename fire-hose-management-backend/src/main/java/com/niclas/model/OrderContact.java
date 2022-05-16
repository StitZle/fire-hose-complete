package com.niclas.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;


public class OrderContact {

    @Id
    private ObjectId id;

    private String firstname;

    private String lastname;

    private String mail;

    private String company;


    public OrderContact() {
    }


    public OrderContact( String firstname, String lastname, String mail, String company ) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.mail = mail;
        this.company = company;
    }


    public String getId() {
        return id.toHexString();
    }


    public void setId( ObjectId id ) {
        this.id = id;
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


    public String getMail() {
        return mail;
    }


    public void setMail( String mail ) {
        this.mail = mail;
    }


    public String getCompany() {
        return company;
    }


    public void setCompany( String company ) {
        this.company = company;
    }
}
