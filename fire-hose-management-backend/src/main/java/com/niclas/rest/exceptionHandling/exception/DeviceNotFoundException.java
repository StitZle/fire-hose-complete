package com.niclas.rest.exceptionHandling.exception;

public class DeviceNotFoundException extends Exception {
    public DeviceNotFoundException(long id) {
        super("Device with ID: " + id + " not found!");
    }
}
