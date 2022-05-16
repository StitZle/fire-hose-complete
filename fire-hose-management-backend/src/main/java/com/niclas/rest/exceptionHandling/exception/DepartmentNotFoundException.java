package com.niclas.rest.exceptionHandling.exception;

import org.bson.types.ObjectId;


public class DepartmentNotFoundException extends Exception {
    public DepartmentNotFoundException( ObjectId id ) {
        super( "Department with ID: " + id.toHexString() + " not found!" );
    }


}
