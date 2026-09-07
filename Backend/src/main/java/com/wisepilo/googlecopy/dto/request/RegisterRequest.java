package com.wisepilo.googlecopy.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class RegisterRequest {

    @NotBlank(message = "El nombre es obligatorio")
    @Size(min = 3, message = "El nombre debe tener al menos 3 caracteres")
    @Size(max = 50, message = "El nombre es demasiado largo")
    private String username;

    @NotBlank(message = "El correo electrónico es obligatorio")
    @Email(message = "El formato del correo no es válido")
    private String email;

    @NotBlank(message = "El teléfono es obligatorio")
    @Size(min = 8, message = "El teléfono debe tener al menos 8 dígitos")
    @Pattern(regexp = "^[0-9+\\- ]+$", message = "Solo se permiten números, espacios y los signos + o -")
    private String phone;

    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres")
    @Pattern(regexp = ".*[A-Z].*", message = "Debe contener al menos una letra mayúscula")
    @Pattern(regexp = ".*[0-9].*", message = "Debe contener al menos un número")
    private String password;

    public RegisterRequest() {}

    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public String getPassword() { return password; }

    public void setUsername(String username) { this.username = username; }
    public void setEmail(String email) { this.email = email; }
    public void setPhone(String phone) { this.phone = phone; }
    public void setPassword(String password) { this.password = password; }
}