package com.ninos.service.dto;

import com.ninos.dto.PurchaseRequest;
import com.ninos.dto.PurchaseResponse;
import com.ninos.model.form.Item;
import com.ninos.model.form.Request;
import com.ninos.repository.CustomerRepository;
import com.ninos.util.Code;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;


@Service
public class PurchaseServiceImpl implements PurchaseService{

    private CustomerRepository customerRepository;
    private Code code;

    @Autowired
    public PurchaseServiceImpl(CustomerRepository customerRepository, Code code) {
        this.customerRepository = customerRepository;
        this.code = code;
    }

    @Transactional
    @Override
    public PurchaseResponse addRequestOrder(PurchaseRequest purchaseRequest) {
        /* #1 get all Request Order */
        Request requestOrder = purchaseRequest.getRequestOrder();
        
        /* #2 get a code randomly from UUID*/
        String myCode = code.getCode();
        requestOrder.setCode(myCode);

        /* #3 note: OneToMany or ManyToOne or ManyToMany, in these cases we have to set from both sides*/
        //requestOrder.setItems(purchaseRequest.getItems());    // we put Item class in Request class, because in Request class ,OneToMany with item class
        //purchaseRequest.getItems().forEach(item -> item.setRequestOrder(requestOrder));  // we put Request class in Item class, because in Item class ,ManyToOne with Request class
        List<Item> items = purchaseRequest.getItems();
        items.forEach(item -> requestOrder.addItem(item));

        /* #4 because it's OneToOne we will set from one side, we will set address into request*/
        requestOrder.setFromAddress(purchaseRequest.getFromAddress());
        requestOrder.setToAddress(purchaseRequest.getToAddress());

        /* #5 */
        //Set<Request> requestOrders = new HashSet<>();
       // requestOrders.add(requestOrder);
       // purchaseRequest.getCustomer().setRequestOrders(requestOrders);  // put a set of request in customer
        //requestOrder.setCustomer(purchaseRequest.getCustomer());   // put customer in request
        purchaseRequest.getCustomer().addRequestOrder(requestOrder);

        customerRepository.save(purchaseRequest.getCustomer());
        return new PurchaseResponse(purchaseRequest.getCustomer().getFullName(),myCode);
    }


}
