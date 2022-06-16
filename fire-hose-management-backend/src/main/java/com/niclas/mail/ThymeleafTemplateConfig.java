package com.niclas.mail;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.thymeleaf.spring5.SpringTemplateEngine;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;

import java.nio.charset.StandardCharsets;


@Configuration
public class ThymeleafTemplateConfig {

    @Bean
    public SpringTemplateEngine springTemplateEngine() {
        SpringTemplateEngine springTemplateEngine = new SpringTemplateEngine();
        springTemplateEngine.addTemplateResolver( classLoaderTemplateResolver() );
        return springTemplateEngine;
    }

    public ClassLoaderTemplateResolver classLoaderTemplateResolver() {
        ClassLoaderTemplateResolver classLoaderTemplateResolver = new ClassLoaderTemplateResolver();
        classLoaderTemplateResolver.setPrefix( "templates/" );
        classLoaderTemplateResolver.setSuffix( ".html" );
        classLoaderTemplateResolver.setTemplateMode( TemplateMode.HTML );
        classLoaderTemplateResolver.setCharacterEncoding( StandardCharsets.UTF_8.name() );
        classLoaderTemplateResolver.setCacheable( false );
        return classLoaderTemplateResolver;
    }
}
