package com.ninos.util;

import java.util.UUID;

public class UserCode {
    public String getCode() {
        return UUID.randomUUID().toString() ;
    }
}