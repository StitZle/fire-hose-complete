package com.niclas.mail;

import com.niclas.model.Order;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;


@Component
public class MailService {

    protected final String ORDER_CONFIRMATION_FROM = "official@niclasbuerger.de";
    protected final String ORDER_CONFIRMATION_SUBJECT = "Schlauchabgabe";
    protected final String ORDER_CONFIRMATION_TEMPLATE = "order-confirmation.html";

    private final MailSenderService mailSenderService;

    public MailService( MailSenderService mailSenderService ) {
        this.mailSenderService = mailSenderService;
    }

    public void buildAndSendOrderConfirmationMail( Order order ) {
        Mail mail = new Mail();
        mail.setFrom( ORDER_CONFIRMATION_FROM );
        mail.setRecipient( "official@niclasbuerger.de" );
        mail.setSubject( ORDER_CONFIRMATION_SUBJECT );
        mail.setTemplate( ORDER_CONFIRMATION_TEMPLATE );


        Map<String, Object> properties = new HashMap<>();
        properties.put( "gender", "HERR" );
        properties.put( "firstname", "Niclas" );
        properties.put( "lastname", "Bürger" );
        properties.put( "orderId", order.getOrderId() );

        String note = "-";
        if( order.getNotes() != null ) {
            note = order.getNotes();
        }
        System.out.println( note );
        properties.put( "notes", note );

        mail.setProperties( properties );

        mailSenderService.sendHtmlMessage( mail );
    }
}
