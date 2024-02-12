package com.ideaboard.dao;

import com.ideaboard.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepo extends JpaRepository<User, UUID> {
    @Query(value = "select u from User u WHERE u.username = :username AND u.password=:password ORDER BY u.username LIMIT 1")
    public Optional<User> findUserByUsernameAndPassword(@Param("username") String username, @Param("password") String password);
}
