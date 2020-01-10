package com.pessoa.mongodbstudy.rest;

import com.pessoa.mongodbstudy.document.Vehicle;
import com.pessoa.mongodbstudy.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/vehicle")
public class VehicleController {

    @Autowired
    VehicleRepository vehicleRepository;

    @RequestMapping(value = "/vehicles", method = RequestMethod.GET)
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }
}
