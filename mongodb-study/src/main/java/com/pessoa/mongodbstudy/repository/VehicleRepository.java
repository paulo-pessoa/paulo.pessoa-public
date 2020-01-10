package com.pessoa.mongodbstudy.repository;

import com.pessoa.mongodbstudy.document.Vehicle;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehicleRepository extends MongoRepository<Vehicle, String> {

}
