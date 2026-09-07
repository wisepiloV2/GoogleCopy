package com.wisepilo.googlecopy.controller;

import com.wisepilo.googlecopy.dto.request.LoginRequest;
import com.wisepilo.googlecopy.dto.request.RegisterRequest;
import com.wisepilo.googlecopy.dto.response.AuthResponse;
import com.wisepilo.googlecopy.service.AuthService;
import com.wisepilo.googlecopy.service.exception.EmailAlreadyRegisteredException;
import com.wisepilo.googlecopy.service.exception.InvalidCredentialsException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import tools.jackson.databind.ObjectMapper;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc(addFilters = false)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private AuthService authService;

    // ==========================================
    // TESTS DE REGISTRO
    // ==========================================

    @Test
    void register_WhenInvalidData_ShouldReturn400AndValidationErrors() throws Exception {
        RegisterRequest request = new RegisterRequest();
        request.setUsername("Al");
        request.setEmail("correo-invalido");
        request.setPhone("123");
        request.setPassword("pass");

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.username").exists())
                .andExpect(jsonPath("$.email").exists())
                .andExpect(jsonPath("$.phone").exists())
                .andExpect(jsonPath("$.password").exists());
    }

    @Test
    void register_WhenValidData_ShouldReturn201AndAuthResponse() throws Exception {
        RegisterRequest request = new RegisterRequest();
        request.setUsername("Wisepilo");
        request.setEmail("wisepilo@test.com");
        request.setPhone("123456789");
        request.setPassword("Password123");

        AuthResponse mockResponse = new AuthResponse("Wisepilo", "123456789", "wisepilo@test.com");

        when(authService.register(any(RegisterRequest.class))).thenReturn(mockResponse);

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.username").value("Wisepilo"))
                .andExpect(jsonPath("$.email").value("wisepilo@test.com"))
                .andExpect(jsonPath("$.phone").value("123456789"));
    }

    @Test
    void register_WhenEmailAlreadyExists_ShouldReturn409Conflict() throws Exception {
        RegisterRequest request = new RegisterRequest();
        request.setUsername("Wisepilo");
        request.setEmail("duplicado@test.com");
        request.setPhone("123456789");
        request.setPassword("Password123");

        when(authService.register(any(RegisterRequest.class)))
                .thenThrow(new EmailAlreadyRegisteredException("El email ya está registrado"));

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.error").value("El email ya está registrado"));
    }

    // ==========================================
    // TESTS DE LOGIN
    // ==========================================

    @Test
    void login_WhenValidCredentials_ShouldReturn200AndAuthResponse() throws Exception {
        LoginRequest request = new LoginRequest();
        request.setEmail("wisepilo@test.com");
        request.setPassword("Password123");

        AuthResponse mockResponse = new AuthResponse("Wisepilo", "123456789", "wisepilo@test.com");

        when(authService.login(any(LoginRequest.class))).thenReturn(mockResponse);

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("Wisepilo"))
                .andExpect(jsonPath("$.email").value("wisepilo@test.com"));
    }

    @Test
    void login_WhenInvalidFormat_ShouldReturn400AndValidationErrors() throws Exception {
        LoginRequest request = new LoginRequest();
        request.setEmail("correo-sin-arroba");
        request.setPassword("");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.email").value("Debe ser una dirección de correo válida"))
                .andExpect(jsonPath("$.password").value("La contraseña es obligatoria"));
    }

    @Test
    void login_WhenInvalidCredentials_ShouldReturn401Unauthorized() throws Exception {
        LoginRequest request = new LoginRequest();
        request.setEmail("existe@test.com");
        request.setPassword("ClaveEquivocada");

        when(authService.login(any(LoginRequest.class)))
                .thenThrow(new InvalidCredentialsException("Credenciales inválidas"));

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.error").value("Credenciales inválidas"));
    }
}