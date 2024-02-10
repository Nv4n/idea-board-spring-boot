package com.ideaboard.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

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

    @ManyToOne
    @JoinColumn(name = "creator_id", nullable = false)
    private User creator;

    @ManyToMany(mappedBy = "favourites")
    private List<User> likedByList = new ArrayList<>();

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
    private List<Note> notes = new ArrayList<>();

    @OneToOne(mappedBy = "board", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Chat chat;

    @Column(nullable = false)
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

    public User getCreator() {
        return creator;
    }

    public void setCreator(User owner) {
        this.creator = owner;
    }

    @JsonIgnore
    public List<User> getLikedByList() {
        return likedByList;
    }

    public void setLikedByList(List<User> likedByList) {
        this.likedByList = likedByList;
    }

    public List<Note> getNotes() {
        return notes;
    }

    public void setNotes(List<Note> notes) {
        this.notes = notes;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("IdeaBoard{");
        sb.append("id=").append(id);
        sb.append(", owner=").append(creator.getId());
        sb.append(", chat=").append(chat.getId());
        sb.append(", createdAt=").append(createdAt);
        sb.append('}');
        return sb.toString();
    }
}
