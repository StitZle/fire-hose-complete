package com.niclas.model;

import com.niclas.utils.Gender;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document( "departments" )
public class Department extends AuditModel {

    @Id
    private ObjectId id;

    private String departmentName;

    private Enum<Gender> gender;

    private String firstname;

    private String lastname;

    private String mail;

    private String street;

    private String houseNumber;

    private String location;

    private String postalCode;

    private String country;

    private boolean registered;

    private boolean sendConfirmationMail;


    public Department() {
    }


    public String getId() {
        return id.toHexString();
    }

    public void setId( ObjectId id ) {
        this.id = id;
    }


}
