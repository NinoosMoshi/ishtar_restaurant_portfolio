package com.ninos.repository;

import com.ninos.model.City;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CityRepository extends JpaRepository<City, Long> {


      public List<City> findByState_StateCode(String code);

}
