package com.pessoa.mongodbstudy.service;

import com.pessoa.mongodbstudy.document.Driver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DriverService {

    @Autowired
    MongoTemplate mongoTemplate;

    public List<Driver> findDriverByOwnedVins(List<String> vinList){
        Query query = new Query();
        query.addCriteria(Criteria.where("vehicles.vin").in(vinList));
        query.fields().exclude("vehicles.vin");
        query.fields().exclude("age");
//        query.with(Sort.by("name").descending().and(Sort.by("vehicles.licensePlate").ascending()));
        query.with(Sort.by("vehicles.licensePlate").descending());
        return mongoTemplate.find(query, Driver.class);
    }

}
