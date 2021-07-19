package com.ninos.dto;

import com.ninos.model.form.Address;
import com.ninos.model.form.Customer;
import com.ninos.model.form.Item;
import com.ninos.model.form.Request;

import lombok.Data;


import java.util.ArrayList;

import java.util.List;

@Data
public class PurchaseRequest {

    private Customer customer;
    private Request requestOrder;
    private List<Item> items = new ArrayList<>();
    private Address fromAddress;
    private Address toAddress;

}
