package com.ninos.service.dto;

import com.ninos.dto.PurchaseRequest;
import com.ninos.dto.PurchaseResponse;
import com.ninos.model.form.Item;
import com.ninos.model.form.Request;
import com.ninos.repository.CustomerRepository;
import com.ninos.util.UserCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;



@Service
public class PurchaseServiceImpl implements PurchaseService{

    private CustomerRepository customerRepository;


    @Autowired
    public PurchaseServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Transactional
    @Override
    public PurchaseResponse addRequestOrder(PurchaseRequest purchaseRequest) {

        Request requestOrder = purchaseRequest.getRequestOrder();

        String myCode = UserCode.getCode();
        requestOrder.setCode(myCode);

        List<Item> items = purchaseRequest.getItems();
        items.forEach(item -> requestOrder.addItem(item));

        requestOrder.setFromAddress(purchaseRequest.getFromAddress());
        requestOrder.setToAddress(purchaseRequest.getToAddress());

        purchaseRequest.getCustomer().addRequestOrder(requestOrder);

        customerRepository.save(purchaseRequest.getCustomer());
        return new PurchaseResponse(purchaseRequest.getCustomer().getFullName(),myCode);
    }


}
