package com.ideaboard.dao;

import com.ideaboard.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepo extends JpaRepository<User, UUID> {
}
