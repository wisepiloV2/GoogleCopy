package com.wisepilo.googlecopy.dto.response;

public class AuthResponse {

    private String username;
    private String phone;
    private String email;

    public AuthResponse() {}

    public AuthResponse(String username, String phone, String email) {
        this.username = username;
        this.phone = phone;
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public String getPhone() {
        return phone;
    }

    public String getEmail() {
        return email;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}