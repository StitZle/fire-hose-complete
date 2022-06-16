package com.niclas.utils;

public enum Gender {
    MALE( "Herr" ), FEMALE( "Frau" ), OTHER( "" );

    public final String value;

    private Gender( String value ) {
        this.value = value;
    }
}


