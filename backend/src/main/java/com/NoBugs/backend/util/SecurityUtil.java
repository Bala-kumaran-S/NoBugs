package com.NoBugs.backend.util;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.NoBugs.backend.entity.User;
import com.NoBugs.backend.service.UserService;

public class SecurityUtil {

    private SecurityUtil() {}

    public static Long getCurrentUserId(UserService userService) {

        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();

            if (auth == null || !auth.isAuthenticated()) {
                return null;
            }

            String email = auth.getName(); 

            return userService.findbyEmail(email)
                    .map(User::getId)
                    .orElse(null);

        } catch (Exception e) {
            return null;
        }
    }
}
