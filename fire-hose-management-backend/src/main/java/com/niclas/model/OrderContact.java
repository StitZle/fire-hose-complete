package com.niclas.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import com.niclas.transfer.OrderContactRequest;
import com.niclas.utils.Gender;


public class OrderContact {

    @Id
    private ObjectId id;

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


    public static OrderContact createOrderContact( OrderContactRequest orderContactRequest ){
        return new OrderContact(orderContactRequest.getGender(), orderContactRequest.getFirstname(),
                orderContactRequest.getLastname(), orderContactRequest.getMail(), orderContactRequest.getOrganisation() );
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


    public String getOrganisation() {
        return organisation;
    }


    public void setOrganisation( String organisation ) {
        this.organisation = organisation;
    }
}
