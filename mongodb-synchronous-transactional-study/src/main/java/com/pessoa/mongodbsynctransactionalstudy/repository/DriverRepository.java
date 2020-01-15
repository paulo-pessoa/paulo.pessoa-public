package com.pessoa.mongodbsynctransactionalstudy.repository;

import com.pessoa.mongodbsynctransactionalstudy.model.Driver;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DriverRepository extends MongoRepository<Driver, String> {

}
