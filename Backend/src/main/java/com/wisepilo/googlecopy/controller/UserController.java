package com.wisepilo.googlecopy.controller;

import com.wisepilo.googlecopy.dto.request.UpdateEmailRequest;
import com.wisepilo.googlecopy.dto.request.UpdatePasswordRequest;
import com.wisepilo.googlecopy.dto.request.UpdatePhoneRequest;
import com.wisepilo.googlecopy.dto.request.UpdateUsernameRequest;
import com.wisepilo.googlecopy.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PutMapping("/username")
    public ResponseEntity<Map<String, String>> updateUsername(@Valid @RequestBody UpdateUsernameRequest request, Authentication authentication) {
        userService.updateUsername(authentication, request);
        return ResponseEntity.ok(Map.of("message", "Nombre actualizado con éxito"));
    }

    @PutMapping("/email")
    public ResponseEntity<Map<String, String>> updateEmail(@Valid @RequestBody UpdateEmailRequest request, Authentication authentication) {
        userService.updateEmail(authentication, request);
        return ResponseEntity.ok(Map.of("message", "Correo electrónico actualizado con éxito"));
    }

    @PutMapping("/phone")
    public ResponseEntity<Map<String, String>> updatePhone(@Valid @RequestBody UpdatePhoneRequest request, Authentication authentication) {
        userService.updatePhone(authentication, request);
        return ResponseEntity.ok(Map.of("message", "Teléfono actualizado con éxito"));
    }

    @PutMapping("/password")
    public ResponseEntity<Map<String, String>> updatePassword(@Valid @RequestBody UpdatePasswordRequest request, Authentication authentication) {
        userService.updatePassword(authentication, request);
        return ResponseEntity.ok(Map.of("message", "Contraseña actualizada con éxito"));
    }
}
