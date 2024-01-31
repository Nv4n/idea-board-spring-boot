package com.ideaboard.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "CHATS")
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;


    @OneToOne
    @JoinColumn(name = "board_id", nullable = false)
    private IdeaBoard board;

    @OneToMany(mappedBy = "chat", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Message> messages = new ArrayList<>();

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    public IdeaBoard getBoard() {
        return board;
    }

    public void setBoard(IdeaBoard board) {
        this.board = board;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("Chat{");
        sb.append("id=").append(id);
        sb.append(", board=").append(board.getId());
        sb.append('}');
        return sb.toString();
    }
}
