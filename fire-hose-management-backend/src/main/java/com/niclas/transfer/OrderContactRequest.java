package com.niclas.transfer;

import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.niclas.utils.Gender;


public class OrderContactRequest {

    @NotBlank
    @JsonProperty( "firstname" )
    private String firstname;

    @NotBlank
    @JsonProperty( "lastname" )
    private String lastname;

    @NotBlank
    @JsonProperty( "gender" )
    private Gender gender;

    @NotBlank
    @JsonProperty( "mail" )
    private String mail;

    @NotBlank
    @JsonProperty( "organisation" )
    private String organisation;


    public OrderContactRequest() {
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


    public Gender getGender() {
        return gender;
    }


    public void setGender( Gender gender ) {
        this.gender = gender;
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
