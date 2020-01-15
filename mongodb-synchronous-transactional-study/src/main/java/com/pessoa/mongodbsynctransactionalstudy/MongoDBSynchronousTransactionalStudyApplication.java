package com.pessoa.mongodbsynctransactionalstudy;

import com.pessoa.mongodbsynctransactionalstudy.model.Driver;
import com.pessoa.mongodbsynctransactionalstudy.model.Vehicle;
import com.pessoa.mongodbsynctransactionalstudy.repository.DriverRepository;
import com.pessoa.mongodbsynctransactionalstudy.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.core.MongoDataIntegrityViolationException;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@SpringBootApplication
public class MongoDBSynchronousTransactionalStudyApplication implements CommandLineRunner {

    @Autowired
    private DriverRepository driverRepository;
    @Autowired
    private VehicleRepository vehicleRepository;
    @Autowired
    private MongoOperations mongoOperations;

    public static void main(String args[]) {
        SpringApplication.run(MongoDBSynchronousTransactionalStudyApplication.class);
    }

    @Override
    @Transactional
    public void run(String args[]) {

        Driver paulo = Driver.builder()
                .age(53)
                .dlNumber("1234567")
                .name("Paulo")
                .vehicles(Collections.singletonList(Vehicle.builder()
                        .licensePlate("BTS46037")
                        .vin("BXY12314312134")
                        .build()))
                .build();

        Vehicle jeep = Vehicle.builder()
                .vin("BTSKASD12312321321")
                .licensePlate("BTS46057")
                .build();

        /* In here, if collection "person" was not created up front, an exception will be thrown
           because DDL operations are not supported in the course of a transaction
         */
        try {
            mongoOperations.insert(paulo);
            mongoOperations.insert(jeep);

//            driverRepository.findAll().stream()
//                    .forEach(System.out::println);
//
//            vehicleRepository.findAll().stream()
//                    .forEach(System.out::println);

//            throw new Exception("something occurred");

        } catch (Exception e){
            System.out.println("rolling back transaction due to " + e.getMessage());
        }

        driverRepository.findAll().stream()
                .forEach(System.out::println);

        vehicleRepository.findAll().stream()
                .forEach(System.out::println);

    }

}