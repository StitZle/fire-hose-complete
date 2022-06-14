package com.niclas.transfer;

import javax.validation.constraints.NotBlank;

import org.bson.types.ObjectId;


public class DepartmentOrderRequest extends DepartmentRequest
{

    @NotBlank
    private ObjectId id;


    public DepartmentOrderRequest( ObjectId id )
    {
        this.id = id;
    }

    public DepartmentOrderRequest( String departmentName, ContactOrderRequest contactOrderRequest, String street, String houseNumber, String location, String postalCode, String country, boolean registered, boolean sendConfirmationMail, ObjectId id ) {
        super( departmentName, contactOrderRequest, street, houseNumber, location, postalCode, country, registered, sendConfirmationMail );
        this.id = id;
    }


    public ObjectId getId() {
        return id;
    }

    public void setId( ObjectId id ) {
        this.id = id;
    }
}
