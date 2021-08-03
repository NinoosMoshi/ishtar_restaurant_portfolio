package com.ninos.service.mail;

import com.ninos.dto.mail.RestaurantMail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class MailServiceImpl implements MailService{

    private JavaMailSender javaMailSender;

    @Autowired
    public MailServiceImpl(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Async
    @Override
    public void sendCodeByMail(RestaurantMail restaurantMail) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom("ninoosmoshi222@gmail.com");
        simpleMailMessage.setTo(restaurantMail.getTo());
        simpleMailMessage.setSubject("UserCode Active");
        simpleMailMessage.setText(restaurantMail.getCode());
        javaMailSender.send(simpleMailMessage);
    }
}
