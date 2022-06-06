package com.niclas.mail;

import com.niclas.model.Contact;
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
        mail.setRecipient( order.getDepartment().getContact().getMail() );
        mail.setSubject( ORDER_CONFIRMATION_SUBJECT );
        mail.setTemplate( ORDER_CONFIRMATION_TEMPLATE );


        Contact contact = order.getDepartment().getContact();

        Map<String, Object> properties = new HashMap<>();
        properties.put( "gender", contact.getGender().value );
        properties.put( "firstname", contact.getFirstname() );
        properties.put( "lastname", contact.getLastname() );
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
