package com.ideaboard.dao;

import com.ideaboard.model.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface NoteRepo extends JpaRepository<Note, UUID> {
}
