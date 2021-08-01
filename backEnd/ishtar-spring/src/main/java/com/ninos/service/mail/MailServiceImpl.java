package com.ninos.service.mail;

import com.ninos.dto.mail.RestaurantMail;
import com.ninos.util.Code;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class MailServiceImpl implements MailService{

    private JavaMailSender javaMailSender;
    private Code code;

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
        simpleMailMessage.setSubject("Code Active");
        simpleMailMessage.setText(code.getCode());
        javaMailSender.send(simpleMailMessage);
    }
}
