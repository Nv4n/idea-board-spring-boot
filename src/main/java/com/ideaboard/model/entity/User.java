package com.ideaboard.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "USERS")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique = true, nullable = false, length = 64)
    private String username;

    @Column(nullable = false, length = 64)
    private String password;

    @OneToMany(mappedBy = "sender", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Message> messages = new ArrayList<>();

    @OneToMany(mappedBy = "creator", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<IdeaBoard> ideaBoards = new ArrayList<>();

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "user_favorite_boards",
            uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "board_id"}),
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "board_id")})
    private List<IdeaBoard> favourites = new ArrayList<>();

    @OneToMany(mappedBy = "creator", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Note> notes = new ArrayList<>();


    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    public void setPassword(String passwordHash) {
        this.password = passwordHash;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    @JsonIgnore
    public List<Message> getMessages() {
        return messages;
    }

    @JsonIgnore
    public List<IdeaBoard> getIdeaBoards() {
        return ideaBoards;
    }

    public void setIdeaBoards(List<IdeaBoard> ideaBoards) {
        this.ideaBoards = ideaBoards;
    }

    @JsonIgnore
    public List<IdeaBoard> getFavourites() {
        return favourites;
    }

    public void setFavourites(List<IdeaBoard> favourites) {
        this.favourites = favourites;
    }

    @JsonIgnore
    public List<Note> getNotes() {
        return notes;
    }

    public void setNotes(List<Note> notes) {
        this.notes = notes;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("User{");
        sb.append("id=").append(id);
        sb.append(", username='").append(username).append('\'');
        sb.append('}');
        return sb.toString();
    }
}
