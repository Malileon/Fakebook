package com.example.fakebook.controller;

import com.example.fakebook.config.UserAuthProvider;
import com.example.fakebook.dto.CredentialsDto;
import com.example.fakebook.dto.SignUpDto;
import com.example.fakebook.dto.UserDto;
import com.example.fakebook.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Arrays;
import java.util.List;

@RestController
@RequiredArgsConstructor
//@RequestMapping("/user")
//@CrossOrigin
public class UserController {

    private final UserService userService;
    private final UserAuthProvider userAuthProvider;
    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody CredentialsDto credentialsDto){
        UserDto user = userService.login(credentialsDto);

        user.setToken(userAuthProvider.createToken(user.getLogin()));
        return ResponseEntity.ok(user);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody SignUpDto signUpDto) {
        UserDto user = userService.register(signUpDto);
        user.setToken(userAuthProvider.createToken(user.getLogin()));
        return ResponseEntity.created(URI.create("/users" + user.getId()))
                .body(user);
    }

    @GetMapping("/testni")
    public ResponseEntity<List<String>> messages(){
        return ResponseEntity.ok(Arrays.asList("first", "second"));
    }
}
