package com.pessoa.mongodbstudy.document;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.IndexDirection;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Vehicle {
    @Id
    String vin;
    @Indexed(name="licensePlate_idx", direction= IndexDirection.ASCENDING)
    String licensePlate;
}
