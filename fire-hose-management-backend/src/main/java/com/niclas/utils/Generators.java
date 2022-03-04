package com.niclas.utils;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Random;

@Component
public class Generators {

    final static String letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

    public static String generateDeviceId(int length) {
        StringBuilder builder = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < length; i++) {
            builder.append(letters.charAt(random.nextInt(letters.length())));
        }
        return builder.toString();
    }

    public static String generateOrderId() {
        LocalDateTime ldt = LocalDateTime.now();
        String prefix = DateTimeFormatter.ofPattern("MM-dd-yyyy").format(ldt);
        String suffix = RandomStringUtils.randomNumeric(6);
        return prefix + "/" + suffix;
    }

}
