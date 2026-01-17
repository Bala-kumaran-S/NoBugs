package com.NoBugs.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.NoBugs.backend.dto.UserDTO;
import com.NoBugs.backend.entity.User;
import com.NoBugs.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public Optional<UserDTO> getUserById(Long id) {
        return userRepository.findById(id).map(this::mapToDTO);
    }

    public User getUserEntityById(Long id) {
    return userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
}

    public Optional<UserDTO> getUserByEmail(String email) {
        return userRepository.findByEmail(email).map(this::mapToDTO);
    }

    public UserDTO createUser(User user) {
        
        User saved = userRepository.save(user);
        return mapToDTO(saved);
    }

    public Optional<UserDTO> updateUser(Long id, User updatedUser) {
        return userRepository.findById(id).map(existing -> {
            existing.setUsername(updatedUser.getUsername());
            existing.setEmail(updatedUser.getEmail());
            existing.setReputationPoints(updatedUser.getReputationPoints());
            User saved = userRepository.save(existing);
            return mapToDTO(saved);
        });
    }

    public boolean deleteUser(Long id) {
        if (!userRepository.existsById(id)) return false;
        userRepository.deleteById(id);
        return true;
    }

    private UserDTO mapToDTO(User user) {
        return new UserDTO(user.getId(), user.getUsername(), user.getEmail(), user.getReputationPoints(), user.getRole().name());
    }

    public Optional<UserDTO> getUserByUsername(String username) {
        return userRepository.findByUsername(username).map(this::mapToDTO);
    }

    public Optional<User> findbyEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        return new org.springframework.security.core.userdetails.User(
            user.getUsername(),
            user.getPassword(),
            List.of(new SimpleGrantedAuthority(user.getRole().name())) // or user.getRoles() if you have authorities
        );
    }

    public UserDetails loadUserByEmail(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        return new org.springframework.security.core.userdetails.User(
            user.getEmail(), // or user.getUsername() if you prefer
            user.getPassword(),
            List.of(new SimpleGrantedAuthority(user.getRole().name()))
        );
    }

    public void updateUserReputation(Long userId, Integer points) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new IllegalArgumentException("User not found"));
    user.setReputationPoints(user.getReputationPoints() + points);
    userRepository.save(user);
}
}
