package com.pessoa.mongodbreactivestudy.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document
@Builder
@Data
@AllArgsConstructor
public class Person {

    private String firstName;
    private String secondName;
    private LocalDateTime timestamp;
    private String nickName;
    private Integer id;

}
