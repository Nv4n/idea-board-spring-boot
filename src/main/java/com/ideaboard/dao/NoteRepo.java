package com.ideaboard.dao;

import com.ideaboard.model.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface NoteRepo extends JpaRepository<Note, UUID> {
    @Query(value = "SELECT n from Note n where n.board.id = :boardId")
    List<Note> findAllByBoardId(@Param("boardId") UUID boardId);
}
