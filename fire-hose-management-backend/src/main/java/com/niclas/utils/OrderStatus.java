package com.niclas.utils;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum OrderStatus {
    OPEN ("Offen"),
    PROGRESS ("In Bearbeitung"),
    CLOSED ("Geschlossen")
    ;

    private final String status;

    private OrderStatus(String status){
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

}
