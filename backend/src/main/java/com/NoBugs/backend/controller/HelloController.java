package com.NoBugs.backend.controller;

import org.springframework.web.bind.annotation.*;

@RestController
//@RequestMapping("/api")
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello from Spring Boot!";
    }

    @GetMapping("/")
    public String work() {
        return "Backend is working!";
    }
}
