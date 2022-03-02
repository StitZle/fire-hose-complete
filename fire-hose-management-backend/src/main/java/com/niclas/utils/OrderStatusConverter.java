package com.niclas.utils;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.stream.Stream;

@Converter(autoApply = true)
public class OrderStatusConverter implements AttributeConverter<OrderStatus, String> {
    //https://www.baeldung.com/jpa-persisting-enums-in-jpa

    @Override
    public String convertToDatabaseColumn(OrderStatus orderStatus){
        if (orderStatus == null){
            return null;
        }
        return orderStatus.getStatus();
    }

    @Override
    public OrderStatus convertToEntityAttribute(String status){
        if (status == null){
            return null;
        }

        return Stream.of(OrderStatus.values())
                .filter(s -> s.getStatus().equals(status))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
