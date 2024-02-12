package com.ideaboard.service.impl;

import com.ideaboard.dao.NoteRepo;
import com.ideaboard.model.dto.IdeaBoardDto;
import com.ideaboard.model.dto.NoteDto;
import com.ideaboard.service.NoteService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class NoteServiceImpl implements NoteService {
    NoteRepo noteRepo;

    @Autowired
    public NoteServiceImpl(NoteRepo noteRepo) {
        this.noteRepo = noteRepo;
    }

    @Transactional
    @Override
    public Optional<IdeaBoardDto> createNote(NoteDto noteDto) {
        return Optional.empty();
    }

    @Override
    public List<NoteDto> findAllByBoardId(UUID boardId) {
noteRepo.findby
        return null;
    }
}
