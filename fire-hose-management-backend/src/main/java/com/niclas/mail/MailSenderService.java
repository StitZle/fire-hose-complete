package com.niclas.mail;

import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.MailAuthenticationException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import java.nio.charset.StandardCharsets;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;


@Service
@Slf4j
public class MailSenderService {

    private final JavaMailSender javaMailSender;
    private final SpringTemplateEngine springTemplateEngine;

    public MailSenderService( JavaMailSender javaMailSender, SpringTemplateEngine springTemplateEngine ) {
        this.javaMailSender = javaMailSender;
        this.springTemplateEngine = springTemplateEngine;
    }

    public void sendHtmlMessage( Mail mail ) {
        //TODO remove javax.mail package
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper( mimeMessage, MimeMessageHelper.MULTIPART_MODE_RELATED, StandardCharsets.UTF_8.name() );

            Context context = new Context();
            context.setVariables( mail.getProperties() );

            mimeMessageHelper.setFrom( mail.getFrom() );
            mimeMessageHelper.setTo( mail.getRecipient() );
            mimeMessageHelper.setSubject( mail.getSubject() );

            String html = springTemplateEngine.process( mail.getTemplate(), context );
            mimeMessageHelper.setText( html, true );
        }
        catch( MessagingException e ) {
            //TODO log
            log.error( e.getMessage() );
            throw new RuntimeException( e );
        }

        log.info( "Sending mail ...." );
        try {
            javaMailSender.send( mimeMessage );
        }
        catch( MailAuthenticationException e ) {
            log.error( "Unable to Authentic0ate..." );
        }
        catch( MailSendException e ) {
            log.error( "Unable to send ..." );
        }
        log.info( "Successfully send mail" );
    }
}
