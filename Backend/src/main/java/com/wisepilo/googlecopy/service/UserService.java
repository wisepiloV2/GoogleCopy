package com.wisepilo.googlecopy.service;

import com.wisepilo.googlecopy.dto.request.UpdateEmailRequest;
import com.wisepilo.googlecopy.dto.request.UpdatePasswordRequest;
import com.wisepilo.googlecopy.dto.request.UpdatePhoneRequest;
import com.wisepilo.googlecopy.dto.request.UpdateUsernameRequest;
import com.wisepilo.googlecopy.entity.CustomUserDetails;
import com.wisepilo.googlecopy.entity.User;
import com.wisepilo.googlecopy.repository.UserRepository;
import com.wisepilo.googlecopy.service.exception.EmailAlreadyRegisteredException;
import com.wisepilo.googlecopy.service.exception.UnauthorizedUserException;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    private User getAuthenticatedUser(Authentication authentication) {
        if (authentication == null || !(authentication.getPrincipal() instanceof CustomUserDetails userDetails)) {
            throw new UnauthorizedUserException("Usuario no autenticado o sesión inválida");
        }
        return userDetails.getUser();
    }

    @Transactional
    public void updateUsername(Authentication authentication, UpdateUsernameRequest request) {
        User user = getAuthenticatedUser(authentication);

        if (request.getUsername() != null && !request.getUsername().trim().isEmpty()) {
            user.setUsername(request.getUsername().trim().toLowerCase());
            userRepository.save(user);
        }
    }

    @Transactional
    public void updateEmail(Authentication authentication, UpdateEmailRequest request) {
        User user = getAuthenticatedUser(authentication);
        String newEmail = request.getEmail();

        if (newEmail != null && !newEmail.trim().isEmpty()) {
            String formattedEmail = newEmail.trim().toLowerCase();

            if (!user.getEmail().equals(formattedEmail) && userRepository.existsByEmail(formattedEmail)) {
                throw new EmailAlreadyRegisteredException("El correo electrónico ya está en uso");
            }

            user.setEmail(formattedEmail);
            userRepository.save(user);
        }
    }

    @Transactional
    public void updatePhone(Authentication authentication, UpdatePhoneRequest request) {
        User user = getAuthenticatedUser(authentication);

        if (request.getPhone() != null && !request.getPhone().trim().isEmpty()) {
            user.setPhone(request.getPhone().trim());
            userRepository.save(user);
        }
    }

    @Transactional
    public void updatePassword(Authentication authentication, UpdatePasswordRequest request) {
        User user = getAuthenticatedUser(authentication);

        if (request.getNewPassword() != null && !request.getNewPassword().trim().isEmpty()) {
            String encodedPassword = passwordEncoder.encode(request.getNewPassword());
            user.setPassword(encodedPassword);
            userRepository.save(user);
        }
    }
}
