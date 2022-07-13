package com.niclas;

import com.fasterxml.jackson.databind.Module;
import com.niclas.utils.ObjectIdModule;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

import java.util.Date;
import java.util.TimeZone;
import javax.annotation.PostConstruct;


@Slf4j
@EnableMongoAuditing
@SpringBootApplication
public class FireHoseManagementApplication {

    @Bean
    public Module objectIdModule() {
        return ObjectIdModule.module();
    }

    @PostConstruct
    void setDefaultTimezone() {
        TimeZone.setDefault( TimeZone.getTimeZone( "Europe/Berlin" ) );
        log.info( "Spring boot application is running in " + TimeZone.getDefault().getDisplayName() + " : " + new Date() );
    }

    @SneakyThrows
    public static void main( String[] args ) {
        SpringApplication.run( FireHoseManagementApplication.class, args );
    }

}
