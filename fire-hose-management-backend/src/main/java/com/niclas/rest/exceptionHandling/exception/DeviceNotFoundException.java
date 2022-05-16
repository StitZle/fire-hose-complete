package com.niclas.rest.exceptionHandling.exception;

import org.bson.types.ObjectId;


public class DeviceNotFoundException extends Exception {
    public DeviceNotFoundException( ObjectId id ) {
        super( "Device with ID: " + id.toHexString() + " not found!" );
    }
}
