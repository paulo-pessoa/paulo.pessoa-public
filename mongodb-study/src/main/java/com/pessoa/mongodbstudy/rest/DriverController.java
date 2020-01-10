package com.pessoa.mongodbstudy.rest;

import com.pessoa.mongodbstudy.document.Driver;
import com.pessoa.mongodbstudy.repository.DriverRepository;
import com.pessoa.mongodbstudy.service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class DriverController {

    @Autowired
    DriverRepository driverRepository;
    @Autowired
    DriverService driverService;

    @RequestMapping(value = "/drivers", method = RequestMethod.GET)
    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }

    @RequestMapping(value = "/drivers/byVins", method = RequestMethod.GET)
    public List<Driver> getDriversByVins(@RequestParam List<String> vins) {
        return driverService.findDriverByOwnedVins(vins);
    }

}
