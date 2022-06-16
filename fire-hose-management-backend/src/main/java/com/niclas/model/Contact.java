package com.niclas.model;

import com.niclas.utils.Gender;


public class Contact
{

    private String firstname;

    private String lastname;

    private Gender gender;

    private String mail;


    public Contact() {
    }

    public Contact( String firstname, String lastname, Gender gender, String mail ) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.gender = gender;
        this.mail = mail;
    }

    public String getFirstname() {
        return firstname;
    }


    public void setFirstname( String firstname ) {
        this.firstname = firstname;
    }


    public String getLastname()
    {
        return lastname;
    }


    public void setLastname( String lastname )
    {
        this.lastname = lastname;
    }


    public Gender getGender()
    {
        return gender;
    }


    public void setGender( Gender gender )
    {
        this.gender = gender;
    }


    public String getMail()
    {
        return mail;
    }


    public void setMail( String mail )
    {
        this.mail = mail;
    }
}
