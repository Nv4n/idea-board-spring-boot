package com.spring.boot.ideaboard.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "IDEA_BOARDS")
public class IdeaBoard {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    @ManyToMany(mappedBy = "favourites")
    private List<User> likedByList = new ArrayList<>();

    @NotNull
    @OneToOne(mappedBy = "board", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Chat chat;

    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt = new Date();

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getId() {
        return id;
    }

    public Chat getChat() {
        return chat;
    }

    public void setChat(Chat chat) {
        this.chat = chat;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }
}
