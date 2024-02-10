package com.ideaboard.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "NOTES")
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "creator_id", nullable = false)
    private User creator;

    @ManyToOne
    @JoinColumn(name = "board_id", nullable = false)
    private IdeaBoard board;

    @Column(length = 512, nullable = false)
    private String content;
    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt = new Date();

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date modifiedAt = new Date();

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getId() {
        return id;
    }

    @JsonIgnore
    public User getCreator() {
        return creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }

    @JsonIgnore
    public IdeaBoard getBoard() {
        return board;
    }

    public void setBoard(IdeaBoard board) {
        this.board = board;
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

    public Date getModifiedAt() {
        return modifiedAt;
    }

    public void setModifiedAt(Date modifiedAt) {
        this.modifiedAt = modifiedAt;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("Note{");
        sb.append("id=").append(id);
        sb.append(", creator=").append(creator.getId());
        sb.append(", board=").append(board.getId());
        sb.append(", content='").append(content).append('\'');
        sb.append(", createdAt=").append(createdAt);
        sb.append(", modifiedAt=").append(modifiedAt);
        sb.append('}');
        return sb.toString();
    }
}
