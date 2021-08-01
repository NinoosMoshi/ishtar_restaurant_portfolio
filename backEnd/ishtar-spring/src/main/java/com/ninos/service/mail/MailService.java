package com.ninos.service.mail;

import com.ninos.dto.mail.RestaurantMail;

public interface MailService {
    public void sendCodeByMail(RestaurantMail restaurantMail);
}
