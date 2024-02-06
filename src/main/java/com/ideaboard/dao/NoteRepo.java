package com.ideaboard.dao;

import com.ideaboard.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface NoteRepo extends JpaRepository<Note, UUID> {
}
