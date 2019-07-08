package com.pessoa.oauth2api.security;

public class SecurityConstants {
    public static final String SECRET = "iWqF2WwS7N7W0pjH2fW29Te2nzdhXm0F";
    public static final long EXPIRATION_TIME = 864_000_000; // 10 days
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String SIGN_UP_URL = "/users/sign-up";
    public static final String AUTHORITIES_KEY = "http://localhost:3000/roles";
}