package com.niclas.mail;

import java.util.Map;


public class Mail {

    String recipient;

    String from;

    String subject;

    String text;

    String template;

    Map<String, Object> properties;

    public Mail() {
    }

    public Mail( String recipient, String from, String subject, String text, String template, Map<String, Object> properties ) {
        this.recipient = recipient;
        this.from = from;
        this.subject = subject;
        this.text = text;
        this.template = template;
        this.properties = properties;
    }

    public String getRecipient() {
        return recipient;
    }

    public void setRecipient( String recipient ) {
        this.recipient = recipient;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom( String from ) {
        this.from = from;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject( String subject ) {
        this.subject = subject;
    }

    public String getText() {
        return text;
    }

    public void setText( String text ) {
        this.text = text;
    }

    public String getTemplate() {
        return template;
    }

    public void setTemplate( String template ) {
        this.template = template;
    }

    public Map<String, Object> getProperties() {
        return properties;
    }

    public void setProperties( Map<String, Object> properties ) {
        this.properties = properties;
    }
}
