package com.pessoa.oauth2api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;


@SpringBootApplication
public class OAuth2ApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(OAuth2ApiApplication.class, args);
    }

}