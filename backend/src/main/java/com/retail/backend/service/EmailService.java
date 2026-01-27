package com.retail.backend.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendResetPasswordMail(String to, String resetLink) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("ravi4751533@gmail.com");
        message.setTo(to);
        message.setSubject("Reset your RetailFlow password");
        message.setText(
                "Click the link below to reset your password:\n\n" +
                        resetLink +
                        "\n\nThis link expires in 15 minutes."
        );

        mailSender.send(message);
    }
}
