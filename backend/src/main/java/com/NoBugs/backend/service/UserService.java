package com.NoBugs.backend.service;

import com.NoBugs.backend.dto.UserDTO;
import com.NoBugs.backend.entity.User;
import com.NoBugs.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public Optional<UserDTO> getUserById(Long id) {
        return userRepository.findById(id).map(this::mapToDTO);
    }

    public UserDTO createUser(User user) {
        // You can hash password here if needed
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
        return new UserDTO(user.getId(), user.getUsername(), user.getEmail(), user.getReputationPoints());
    }
}
