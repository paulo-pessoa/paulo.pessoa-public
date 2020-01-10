package com.pessoa.mongodbstudy.config;

import com.mongodb.MongoClient;
import com.pessoa.mongodbstudy.document.Driver;
import com.pessoa.mongodbstudy.document.Vehicle;
import com.pessoa.mongodbstudy.repository.DriverRepository;
import com.pessoa.mongodbstudy.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.Arrays;
import java.util.Collections;

@Configuration
public class MongoDBConfig {

    @Autowired
    VehicleRepository vehicleRepository;
    @Autowired
    DriverRepository driverReposiory;

    @Bean
    void startUp() {

        Vehicle wrangler = Vehicle.builder()
                .vin("ZWXVB12345678")
                .licensePlate("BTS46057")
                .build();

        Vehicle beetle = Vehicle.builder()
                .vin("ZWXVB87654321")
                .licensePlate("BXAL24")
                .build();

        Vehicle escape = Vehicle.builder()
                .vin("ZWXVB4568123")
                .licensePlate("321MKG")
                .build();

        Vehicle wrangler2 = Vehicle.builder()
                .vin("ZWXVB000000011")
                .licensePlate("MAMMAMIA")
                .build();

        Vehicle[] paulosVehicles = {wrangler, beetle};

        Driver paulo = Driver.builder()
                .name("Paulo")
                .dlNumber("123456")
                .age(53)
                .vehicles(Arrays.asList(paulosVehicles))
                .build();

        Driver luciana = Driver.builder()
                .name("Luciana")
                .dlNumber("111111")
                .age(49)
                .vehicles(Collections.singletonList(escape))
                .build();

        Driver joao = Driver.builder()
                .name("Joao Paulo")
                .dlNumber("222222")
                .age(26)
                .vehicles(Collections.singletonList(wrangler2))
                .build();
        vehicleRepository.save(wrangler);
        vehicleRepository.save(beetle);
        vehicleRepository.save(wrangler2);
        vehicleRepository.save(escape);

        driverReposiory.save(paulo);
        driverReposiory.save(luciana);
        driverReposiory.save(joao);
    }

    @Bean
    public MongoClient mongoClient(){
        return new MongoClient("localhost", 27017);
    }

    @Bean
    public MongoTemplate mongoTemplate(){
        return new MongoTemplate(mongoClient(), "paulo");
    }
}
