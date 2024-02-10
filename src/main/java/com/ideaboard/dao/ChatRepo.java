package com.ideaboard.dao;

import com.ideaboard.model.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ChatRepo extends JpaRepository<Chat, UUID> {
}
