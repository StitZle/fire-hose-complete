package com.niclas.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table( name = "order_contact" )
public class OrderContact {

    @Id
    @Column( name = "id" )
    @GeneratedValue( strategy = GenerationType.AUTO ) //TODO better config for GenerationType
    private long id;

    @Column( name = "firstname" )
    private String firstname;

    @Column( name = "lastname" )
    private String lastname;

    @Column( name = "mail" )
    private String mail;

    @Column( name = "company" )
    private String company;


    public OrderContact() {
    }


    public OrderContact( String firstname, String lastname, String mail, String company ) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.mail = mail;
        this.company = company;
    }


    public long getId() {
        return id;
    }


    public void setId( long id ) {
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
