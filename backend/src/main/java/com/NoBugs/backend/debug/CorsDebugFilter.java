package com.NoBugs.backend.debug;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class CorsDebugFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            System.out.println("=== CORS DEBUG ===");
            System.out.println("METHOD   : " + request.getMethod());
            System.out.println("URI      : " + request.getRequestURI());
            System.out.println("ORIGIN   : " + request.getHeader("Origin"));
            System.out.println("REQ HDRS : " + request.getHeader("Access-Control-Request-Headers"));
            System.out.println("REQ METH : " + request.getHeader("Access-Control-Request-Method"));
        }

        filterChain.doFilter(request, response);

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            System.out.println("RESP ACAO : " + response.getHeader("Access-Control-Allow-Origin"));
            System.out.println("RESP ACAM : " + response.getHeader("Access-Control-Allow-Methods"));
            System.out.println("RESP ACAH : " + response.getHeader("Access-Control-Allow-Headers"));
            System.out.println("==================");
        }
    }
}
