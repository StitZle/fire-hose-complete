package com.niclas.utils;

import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class DeviceIdGenerator {

    final String letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

    public String generate(int length) {
        StringBuilder builder = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < length; i++) {
            builder.append(letters.charAt(random.nextInt(letters.length())));
        }
        return builder.toString();
    }

}
