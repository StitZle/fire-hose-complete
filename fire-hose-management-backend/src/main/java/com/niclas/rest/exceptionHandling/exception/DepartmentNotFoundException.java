package com.niclas.rest.exceptionHandling.exception;

public class DepartmentNotFoundException extends Exception {
    public DepartmentNotFoundException(long id) {
        super("Department with ID: " + id + " not found!");
    }


}
