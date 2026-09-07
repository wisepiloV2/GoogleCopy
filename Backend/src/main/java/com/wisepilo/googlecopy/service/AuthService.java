package com.wisepilo.googlecopy.service;

import com.wisepilo.googlecopy.dto.request.LoginRequest;
import com.wisepilo.googlecopy.dto.request.RegisterRequest;
import com.wisepilo.googlecopy.dto.response.AuthResponse;
import com.wisepilo.googlecopy.entity.CustomUserDetails;
import com.wisepilo.googlecopy.entity.User;
import com.wisepilo.googlecopy.repository.UserRepository;
import com.wisepilo.googlecopy.service.exception.EmailAlreadyRegisteredException;
import com.wisepilo.googlecopy.service.exception.InvalidCredentialsException;
import com.wisepilo.googlecopy.service.exception.UnauthorizedUserException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    private Authentication authenticate(String email, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );

        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authentication);
        SecurityContextHolder.setContext(context);

        return authentication;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyRegisteredException("El email ya está registrado");
        }

        String encodedPassword = passwordEncoder.encode(request.getPassword());

        User user = new User(
                request.getUsername().toLowerCase(),
                request.getPhone(),
                request.getEmail().toLowerCase(),
                encodedPassword
        );

        userRepository.save(user);

        authenticate(request.getEmail(), request.getPassword());

        return new AuthResponse(
                user.getUsername(),
                user.getPhone(),
                user.getEmail()
        );
    }

    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticate(request.getEmail(), request.getPassword());
        if (!(authentication.getPrincipal() instanceof CustomUserDetails userDetails)) {
            throw new UnauthorizedUserException("Usuario no encontrado o sesión inválida");
        }

        User user = userDetails.getUser();

        return new AuthResponse(
                user.getUsername(),
                user.getPhone(),
                user.getEmail()
        );
    }

    public void verifyPassword(String rawPassword, Authentication authentication) {
        if (authentication == null || !(authentication.getPrincipal() instanceof CustomUserDetails userDetails)) {
            throw new UnauthorizedUserException("Usuario no encontrado o sesión inválida");
        }

        User user = userDetails.getUser();

        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new InvalidCredentialsException("Contraseña incorrecta");
        }
    }

    public AuthResponse getCurrentUser(Authentication authentication) {
        if (authentication == null || !(authentication.getPrincipal() instanceof CustomUserDetails userDetails)) {
            throw new UnauthorizedUserException("Usuario no encontrado o sesión inválida");
        }
        User user = userDetails.getUser();

        return new AuthResponse(
                user.getUsername(),
                user.getPhone(),
                user.getEmail()
        );
    }
}