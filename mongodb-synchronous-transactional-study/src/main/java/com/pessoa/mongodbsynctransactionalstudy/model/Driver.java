package com.pessoa.mongodbsynctransactionalstudy.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceConstructor;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.IndexDirection;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document
@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Driver {

    @Id
    String dlNumber;
    @Indexed(name = "driverName_idx", direction = IndexDirection.ASCENDING)
    @Field(name = "driverName")
    String name;
    Integer age;
    List<Vehicle> vehicles;
}
