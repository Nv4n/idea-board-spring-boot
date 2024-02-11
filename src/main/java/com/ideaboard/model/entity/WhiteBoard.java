package com.ideaboard.model.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.Type;

import java.util.UUID;

@Entity
@Table(name = "WHITEBOARDS")
public class WhiteBoard {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    //Has to be the snapshot json schema
    @Column(nullable = true)
    private String snapshot;

    @OneToOne
    @JoinColumn(name = "board_id", nullable = true)
    private IdeaBoard board;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getSnapshot() {
        return snapshot;
    }

    public void setSnapshot(String snapshot) {
        this.snapshot = snapshot;
    }


    public IdeaBoard getBoard() {
        return board;
    }

    public void setBoard(IdeaBoard board) {
        this.board = board;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("WhiteBoard{");
        sb.append("id=").append(id);
        sb.append(", snapshot='").append(snapshot).append('\'');
        sb.append('}');
        return sb.toString();
    }

}
