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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    private User dummyUser;
    private Authentication mockAuth;

    @BeforeEach
    void setUp() {
        dummyUser = new User("original", "123", "original@test.com", "pass");
        CustomUserDetails dummyUserDetails = new CustomUserDetails(dummyUser);

        mockAuth = mock(Authentication.class);
        lenient().when(mockAuth.getPrincipal()).thenReturn(dummyUserDetails);
    }

    // ==========================================
    // TESTS DE AUTENTICACIÓN (Para el método privado)
    // ==========================================

    @Test
    void anyUpdateMethod_WhenUserIsNull_ShouldThrowUnauthorizedUserException() {
        UpdateUsernameRequest request = new UpdateUsernameRequest();

        assertThrows(UnauthorizedUserException.class, () -> userService.updateUsername(null, request));
    }

    // ==========================================
    // TESTS DE ACTUALIZACIÓN
    // ==========================================

    @Test
    void updateUsername_WhenValid_ShouldFormatAndSave() {
        UpdateUsernameRequest request = new UpdateUsernameRequest();
        request.setUsername("   NUEVO   "); // Probamos espacios y mayúsculas

        userService.updateUsername(mockAuth, request);

        assertEquals("nuevo", dummyUser.getUsername());
        verify(userRepository, times(1)).save(dummyUser);
    }

    @Test
    void updateEmail_WhenEmailIsNewAndAvailable_ShouldUpdateAndSave() {
        UpdateEmailRequest request = new UpdateEmailRequest();
        request.setEmail("nuevo@test.com");

        when(userRepository.existsByEmail("nuevo@test.com")).thenReturn(false);

        userService.updateEmail(mockAuth, request);

        assertEquals("nuevo@test.com", dummyUser.getEmail());
        verify(userRepository, times(1)).save(dummyUser);
    }

    @Test
    void updateEmail_WhenEmailAlreadyExists_ShouldThrowException() {
        UpdateEmailRequest request = new UpdateEmailRequest();
        request.setEmail("ocupado@test.com");

        when(userRepository.existsByEmail("ocupado@test.com")).thenReturn(true);

        assertThrows(EmailAlreadyRegisteredException.class, () -> userService.updateEmail(mockAuth, request));

        assertEquals("original@test.com", dummyUser.getEmail());
        verify(userRepository, never()).save(any());
    }

    @Test
    void updateEmail_WhenEmailIsTheSameAsCurrent_ShouldSaveWithoutCheckingDB() {
        UpdateEmailRequest request = new UpdateEmailRequest();
        request.setEmail("original@test.com"); // El mismo que ya tiene el usuario

        userService.updateEmail(mockAuth, request);

        verify(userRepository, never()).existsByEmail(anyString());
        verify(userRepository, times(1)).save(dummyUser);
    }

    @Test
    void updatePhone_WhenValid_ShouldFormatAndSave() {
        UpdatePhoneRequest request = new UpdatePhoneRequest();
        request.setPhone(" 987654321 ");

        userService.updatePhone(mockAuth, request);

        assertEquals("987654321", dummyUser.getPhone());
        verify(userRepository, times(1)).save(dummyUser);
    }

    @Test
    void updatePassword_WhenValid_ShouldEncodeAndSave() {
        UpdatePasswordRequest request = new UpdatePasswordRequest();
        request.setNewPassword("NuevaClave123");

        when(passwordEncoder.encode("NuevaClave123")).thenReturn("ClaveEncriptada");

        userService.updatePassword(mockAuth, request);

        assertEquals("ClaveEncriptada", dummyUser.getPassword());
        verify(userRepository, times(1)).save(dummyUser);
    }
}