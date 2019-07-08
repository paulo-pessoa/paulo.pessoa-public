package com.pessoa.oauth2api.rest;

import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class RestApi extends ResourceServerConfigurerAdapter
{
    @RequestMapping("/public")
    public String publicApi(OAuth2Authentication authentication) {
        return "{ \"message\": \"Hello from a public API\" }";
    }

    @RequestMapping("/private")
    public String privateApi() {
        return "{ \"message\": \"Hello from a private API\" }";
    }

    @RequestMapping("/admin")
    public String admin() {
        return "{ \"message\": \"Hello from an admin API\" }";
    }

    @RequestMapping("/course")
    public String courses(){
        return "{\"courses\": [ { \"id\": 1, \"title\": \"Building Apps with React and Redux\" }, { \"id\": 2, \"title\": \"Creating Reusable React Components\" }]}";
    }

}
