package com.niclas;

import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import javax.annotation.PostConstruct;
import java.util.Date;
import java.util.TimeZone;

@Slf4j
@EnableJpaAuditing
@SpringBootApplication
public class FireHoseManagementApplication {


    @PostConstruct
    void setDefaultTimezone() {
        TimeZone.setDefault( TimeZone.getTimeZone("Europe/Berlin"));
        log.info("Spring boot application is running in " + TimeZone.getDefault().getDisplayName() + " : " + new Date());
    }

    @SneakyThrows
    public static void main(String[] args) {
        SpringApplication.run(FireHoseManagementApplication.class, args);
    }

}
