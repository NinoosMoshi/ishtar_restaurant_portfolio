package com.ninos.service.dto;

import com.ninos.dto.PurchaseRequest;
import com.ninos.dto.PurchaseResponse;

public interface PurchaseService {

    public PurchaseResponse addRequestOrder(PurchaseRequest purchaseRequest);

}
