package com.ideaboard.dao;

import com.ideaboard.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MessageRepo extends JpaRepository<Message, UUID> {
}
