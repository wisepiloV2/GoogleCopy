package com.wisepilo.googlecopy.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class UpdatePhoneRequest {
    @NotBlank(message = "El teléfono es obligatorio")
    @Size(min = 8, message = "El teléfono debe tener al menos 8 dígitos")
    @Pattern(regexp = "^[0-9+\\- ]+$", message = "Solo se permiten números, espacios y los signos + o -")
    private String phone;

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}