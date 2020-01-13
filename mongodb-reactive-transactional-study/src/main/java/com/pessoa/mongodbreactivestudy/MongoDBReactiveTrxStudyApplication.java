package com.pessoa.mongodbreactivestudy;

import com.pessoa.mongodbreactivestudy.model.Person;
import com.pessoa.mongodbreactivestudy.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import reactor.core.publisher.Flux;

import java.time.LocalDateTime;

@SpringBootApplication
public class MongoDBReactiveStudyApplication implements CommandLineRunner {

    @Autowired
    private PersonRepository personRepository;

    public static void main(String args[]) {
        SpringApplication.run(MongoDBReactiveStudyApplication.class);
    }

    @Override public void run(String args[]) {
        final Person johnAoe = new Person("john", "aoe", LocalDateTime.now(), "loser", 1);
        final Person johnBoe = new Person("john", "boe", LocalDateTime.now(), "a bit of a loser", 2);
        final Person johnCoe = new Person("john", "coe", LocalDateTime.now(), "average", 3);
        final Person johnDoe = new Person("john", "doe", LocalDateTime.now(), "winner", 4);
        personRepository.saveAll(Flux.just(johnAoe, johnBoe, johnCoe, johnDoe)).subscribe();
        personRepository.findByFirstName("john").log().map(Person::getSecondName).subscribe(System.out::println);
//        personRepository.findOneByFirstName("john").log().map(Person::getId).subscribe(System.out::println);
        try{
            Thread.sleep(10000);
        }catch(Exception e){
            System.out.println("sleep exception " + e.getMessage());
        }

        final Person paulo = new Person("paulo", "pessoa", LocalDateTime.now(), "winner", 5);
        personRepository.save(paulo).subscribe();
        personRepository.findAll().log().map(Person::getSecondName).subscribe(System.out::println);
    }

}