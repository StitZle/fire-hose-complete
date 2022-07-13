package com.niclas.model;

import com.niclas.transfer.OrderContactRequest;
import com.niclas.utils.Gender;


public class OrderContact {

    private Gender gender;

    private String firstname;

    private String lastname;

    private String mail;

    private String organisation;


    public OrderContact() {
    }


    public OrderContact( Gender gender, String firstname, String lastname, String mail, String organisation ) {
        this.gender = gender;
        this.firstname = firstname;
        this.lastname = lastname;
        this.mail = mail;
        this.organisation = organisation;
    }


    public static OrderContact createOrderContact( OrderContactRequest orderContactRequest ) {
        return new OrderContact( orderContactRequest.getGender(), orderContactRequest.getFirstname(), orderContactRequest.getLastname(), orderContactRequest.getMail(), orderContactRequest.getOrganisation() );
    }

    public String getFullName() {
        return this.getFirstname() + " " + this.getLastname();
    }


    public Gender getGender() {
        return gender;
    }

    public void setGender( Gender gender ) {
        this.gender = gender;
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


    public String getOrganisation() {
        return organisation;
    }


    public void setOrganisation( String organisation ) {
        this.organisation = organisation;
    }
}
