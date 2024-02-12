package com.grpc.service;

import com.ideaboard.model.dto.IdeaBoardDto;
import com.ideaboard.model.dto.NoteDto;
import com.ideaboard.service.IdeaBoardService;
import com.ideaboard.service.NoteService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TransactionalBoardService {
    private IdeaBoardService ideaBoardService;
    private NoteService noteService;

    @Autowired
    public TransactionalBoardService(IdeaBoardService boardService, NoteService noteService) {
        this.ideaBoardService = boardService;
        this.noteService = noteService;
    }

    @Transactional
    public Optional<IdeaBoardDto> createTransactionalBoard(IdeaBoardDto ideaBoardDto) {
        return ideaBoardService.createIdeaBoard(ideaBoardDto);
    }

    @Transactional
    public Optional<IdeaBoardDto> createTransactionalNote(NoteDto noteDto) {
        return noteService.createNote(noteDto);
    }
}
