package com.ninos.service;

import com.ninos.model.State;
import com.ninos.repository.StateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StateService {

    private StateRepository stateRepository;

    @Autowired
    public StateService(StateRepository stateRepository) {
        this.stateRepository = stateRepository;
    }


    public List<State> allStates(){
        return stateRepository.findAll();
    }


}
