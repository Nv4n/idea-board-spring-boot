package com.ideaboard.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "MESSAGES")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;

    @ManyToOne
    @JoinColumn(name = "chat_id", nullable = false)
    private Chat chat;

    @Column(length = 512, nullable = false)
    private String content;
    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt = new Date();

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    @JsonIgnore
    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    @JsonIgnore
    public Chat getChat() {
        return chat;
    }

    public void setChat(Chat chat) {
        this.chat = chat;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("Message{");
        sb.append("id=").append(id);
        sb.append(", sender=").append(sender.getId());
        sb.append(", chat=").append(chat.getId());
        sb.append(", content='").append(content).append('\'');
        sb.append(", createdAt=").append(createdAt);
        sb.append('}');
        return sb.toString();
    }
}
