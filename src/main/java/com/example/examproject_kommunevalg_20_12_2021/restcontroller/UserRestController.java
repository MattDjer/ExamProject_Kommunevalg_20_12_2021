package com.example.examproject_kommunevalg_20_12_2021.restcontroller;

import com.example.examproject_kommunevalg_20_12_2021.model.User;
import com.example.examproject_kommunevalg_20_12_2021.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.Optional;

@RestController
public class UserRestController {

    @Autowired
    UserRepository userRepository;

    @PostMapping(value = "/api/save-user", consumes = "application/json")
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        userRepository.save(user);
        return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
    }

    @PostMapping(value = "/api/login", consumes = "application/json")
    public ResponseEntity<User> login(@RequestBody User user) {

        Optional<User> user1 = userRepository.findByNameAndPassword(user.getName(), user.getPassword());

        if (user1.isPresent()) {

            return new ResponseEntity<>(user1.get(), HttpStatus.OK);

        }
        return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
    }
}
