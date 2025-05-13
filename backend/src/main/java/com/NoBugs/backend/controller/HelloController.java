package com.NoBugs.backend.controller;

import org.springframework.web.bind.annotation.*;

@RestController
//@RequestMapping("/api")
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello";
    }

    @GetMapping("/")
    public String work() {
        return "Backend is working! right";
    }

    @GetMapping("/test")
    public String test() {
        return "testing 1 2 3";
    }
}
