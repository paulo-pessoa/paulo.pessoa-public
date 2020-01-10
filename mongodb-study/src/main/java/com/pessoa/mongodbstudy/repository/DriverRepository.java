package com.pessoa.mongodbstudy.repository;

import com.pessoa.mongodbstudy.document.Driver;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DriverRepository extends MongoRepository<Driver, String> {

}
