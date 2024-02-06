package com.ideaboard.dao;

import com.ideaboard.model.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ChatRepo extends JpaRepository<Chat, UUID> {
}
