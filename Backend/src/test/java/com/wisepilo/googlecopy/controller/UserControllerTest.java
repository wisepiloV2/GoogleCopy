package com.wisepilo.googlecopy.controller;

import com.wisepilo.googlecopy.dto.request.UpdateEmailRequest;
import com.wisepilo.googlecopy.dto.request.UpdatePasswordRequest;
import com.wisepilo.googlecopy.dto.request.UpdatePhoneRequest;
import com.wisepilo.googlecopy.dto.request.UpdateUsernameRequest;
import com.wisepilo.googlecopy.service.UserService;
import com.wisepilo.googlecopy.service.exception.EmailAlreadyRegisteredException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import tools.jackson.databind.ObjectMapper;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
@AutoConfigureMockMvc(addFilters = false)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private UserService userService;

    @Test
    void updateUsername_ShouldReturn200AndSuccessMessage() throws Exception {
        UpdateUsernameRequest request = new UpdateUsernameRequest();
        request.setUsername("NuevoNombre");

        doNothing().when(userService).updateUsername(any(), any());

        mockMvc.perform(put("/api/users/username")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Nombre actualizado con éxito"));
    }

    @Test
    void updateEmail_WhenValid_ShouldReturn200AndSuccessMessage() throws Exception {
        UpdateEmailRequest request = new UpdateEmailRequest();
        request.setEmail("nuevo@test.com");

        doNothing().when(userService).updateEmail(any(), any());

        mockMvc.perform(put("/api/users/email")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Correo electrónico actualizado con éxito"));
    }

    @Test
    void updateEmail_WhenEmailExists_ShouldReturn409Conflict() throws Exception {
        UpdateEmailRequest request = new UpdateEmailRequest();
        request.setEmail("duplicado@test.com");

        doThrow(new EmailAlreadyRegisteredException("El correo electrónico ya está en uso"))
                .when(userService).updateEmail(any(), any());

        mockMvc.perform(put("/api/users/email")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.error").value("El correo electrónico ya está en uso"));
    }

    @Test
    void updatePhone_ShouldReturn200AndSuccessMessage() throws Exception {
        UpdatePhoneRequest request = new UpdatePhoneRequest();
        request.setPhone("987654321");

        doNothing().when(userService).updatePhone(any(), any());

        mockMvc.perform(put("/api/users/phone")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Teléfono actualizado con éxito"));
    }

    @Test
    void updatePassword_ShouldReturn200AndSuccessMessage() throws Exception {
        UpdatePasswordRequest request = new UpdatePasswordRequest();
        request.setNewPassword("NuevaClave123");

        doNothing().when(userService).updatePassword(any(), any());

        mockMvc.perform(put("/api/users/password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Contraseña actualizada con éxito"));
    }
}
