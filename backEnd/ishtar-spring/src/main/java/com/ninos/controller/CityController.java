package com.ninos.controller;

import com.ninos.model.City;
import com.ninos.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CityController {

    private CityService cityService;

    @Autowired
    public CityController(CityService cityService) {
        this.cityService = cityService;
    }

    // http://localhost:8080/api/cities
    @GetMapping("/cities")
    public List<City> getAllCities(){
        return cityService.getCities();
    }


}
