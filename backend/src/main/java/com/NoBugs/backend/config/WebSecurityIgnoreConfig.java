package com.NoBugs.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.http.HttpMethod;

@Configuration
public class WebSecurityIgnoreConfig {

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        System.out.println(">>> WebSecurityCustomizer LOADED");
        return web -> web.ignoring()
                .requestMatchers(HttpMethod.OPTIONS, "/**");
    }
}
