package com.niclas.rest.exceptionHandling.exception;

public class DepartmentNotFoundException extends Exception {
    public DepartmentNotFoundException( long departmentId ) {
        super( "Department with ID: " + departmentId + " not found!" );
    }


}
