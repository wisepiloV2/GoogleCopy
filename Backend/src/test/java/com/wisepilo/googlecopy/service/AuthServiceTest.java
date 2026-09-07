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
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthService authService;

    private User dummyUser;
    private CustomUserDetails dummyUserDetails;

    @BeforeEach
    void setUp() {
        dummyUser = new User("wisepilo", "123456789", "wisepilo@test.com", "encodedPass");
        dummyUserDetails = new CustomUserDetails(dummyUser);
    }

    @AfterEach
    void tearDown() {
        SecurityContextHolder.clearContext();
    }

    // ==========================================
    // TESTS DE REGISTER
    // ==========================================

    @Test
    void register_WhenValidRequest_ShouldSaveUserAndReturnAuthResponse() {
        RegisterRequest request = new RegisterRequest();
        request.setUsername("Wisepilo");
        request.setEmail("wisepilo@test.com");
        request.setPhone("123456789");
        request.setPassword("RawPassword");

        Authentication mockAuth = mock(Authentication.class);

        when(userRepository.existsByEmail(anyString())).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPass");
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(mockAuth);

        AuthResponse response = authService.register(request);

        assertNotNull(response);
        assertEquals("wisepilo", response.getUsername());
        assertEquals("wisepilo@test.com", response.getEmail());

        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void register_WhenEmailExists_ShouldThrowEmailAlreadyRegisteredException() {
        RegisterRequest request = new RegisterRequest();
        request.setEmail("existe@test.com");

        when(userRepository.existsByEmail("existe@test.com")).thenReturn(true);

        assertThrows(EmailAlreadyRegisteredException.class, () -> authService.register(request));

        verify(userRepository, never()).save(any());
    }

    // ==========================================
    // TESTS DE LOGIN
    // ==========================================

    @Test
    void login_WhenValidCredentials_ShouldReturnAuthResponse() {
        LoginRequest request = new LoginRequest();
        request.setEmail("wisepilo@test.com");
        request.setPassword("RawPassword");

        Authentication mockAuth = mock(Authentication.class);
        when(mockAuth.getPrincipal()).thenReturn(dummyUserDetails);
        when(authenticationManager.authenticate(any())).thenReturn(mockAuth);

        AuthResponse response = authService.login(request);

        assertNotNull(response);
        assertEquals("wisepilo@test.com", response.getEmail());
    }

    // ==========================================
    // TESTS DE VERIFY PASSWORD
    // ==========================================

    @Test
    void verifyPassword_WhenPasswordIsCorrect_ShouldNotThrowException() {
        Authentication mockAuth = mock(Authentication.class);
        when(mockAuth.getPrincipal()).thenReturn(dummyUserDetails);

        when(passwordEncoder.matches("CorrectPass", dummyUser.getPassword())).thenReturn(true);

        assertDoesNotThrow(() -> authService.verifyPassword("CorrectPass", mockAuth));
    }

    @Test
    void verifyPassword_WhenPasswordIsIncorrect_ShouldThrowInvalidCredentialsException() {
        Authentication mockAuth = mock(Authentication.class);
        when(mockAuth.getPrincipal()).thenReturn(dummyUserDetails);

        when(passwordEncoder.matches("WrongPass", dummyUser.getPassword())).thenReturn(false);

        assertThrows(InvalidCredentialsException.class, () -> authService.verifyPassword("WrongPass", mockAuth));
    }

    // ==========================================
    // TESTS DE MANEJO DE TOKENS INVÁLIDOS (getCurrentUser y verifyPassword)
    // ==========================================

    @Test
    void getCurrentUser_WhenAuthenticationIsNull_ShouldThrowUnauthorizedUserException() {
        assertThrows(UnauthorizedUserException.class, () -> authService.getCurrentUser(null));
    }

    @Test
    void getCurrentUser_WhenPrincipalIsNotCustomUserDetails_ShouldThrowUnauthorizedUserException() {
        Authentication mockAuth = mock(Authentication.class);
        when(mockAuth.getPrincipal()).thenReturn("UsuarioAnonimoString");

        assertThrows(UnauthorizedUserException.class, () -> authService.getCurrentUser(mockAuth));
    }

    @Test
    void getCurrentUser_WhenValidAuthentication_ShouldReturnAuthResponse() {
        Authentication mockAuth = mock(Authentication.class);
        when(mockAuth.getPrincipal()).thenReturn(dummyUserDetails);

        AuthResponse response = authService.getCurrentUser(mockAuth);

        assertNotNull(response);
        assertEquals("wisepilo", response.getUsername());
        assertEquals("wisepilo@test.com", response.getEmail());
    }
}
