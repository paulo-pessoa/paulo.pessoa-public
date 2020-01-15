package com.pessoa.mongodbsynctransactionalstudy.repository;

import com.pessoa.mongodbsynctransactionalstudy.model.Vehicle;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehicleRepository extends MongoRepository<Vehicle, String> {

}
