package com.ideaboard.dao;

import com.ideaboard.model.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.UUID;

@Repository
public interface MessageRepo extends JpaRepository<Message, UUID> {
    @Query(value = "SELECT msg FROM Message msg WHERE msg.chat.id = :chat_id")
    Collection<Message> findAllByChatId(@Param("chat_id") UUID chatId);
}
