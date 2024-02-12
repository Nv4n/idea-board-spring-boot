package com.ideaboard.service.impl;

import com.ideaboard.dao.NoteRepo;
import com.ideaboard.model.dto.IdeaBoardDto;
import com.ideaboard.model.dto.NoteDto;
import com.ideaboard.model.entity.IdeaBoard;
import com.ideaboard.model.entity.Note;
import com.ideaboard.model.entity.User;
import com.ideaboard.service.IdeaBoardService;
import com.ideaboard.service.NoteService;
import com.ideaboard.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class NoteServiceImpl implements NoteService {
    NoteRepo noteRepo;
    UserService userService;
    IdeaBoardService ideaBoardService;

    @Autowired
    public NoteServiceImpl(NoteRepo noteRepo, UserService userService, IdeaBoardService ideaBoardService) {
        this.noteRepo = noteRepo;
        this.ideaBoardService = ideaBoardService;
        this.userService = userService;
    }

    @Transactional
    @Override
    public Optional<NoteDto> createNote(NoteDto noteDto) {
        Note note = new Note();
        Optional<User> user = userService.findById(noteDto.getCreatorId());
        Optional<IdeaBoard> board = ideaBoardService.getIdeaBoardById(noteDto.getBoardId());
        if (user.isEmpty()) {
            return Optional.empty();
        }
        if (board.isEmpty()) {
            return Optional.empty();
        }
        note.setCreatedAt(new Date());
        note.setContent(noteDto.getContent());
        note.setBoard(board.get());
        note.setModifiedAt(new Date());
        note.setCreator(user.get());
        Note createdEntity = noteRepo.save(note);
        NoteDto returnDto = new NoteDto();
        returnDto.setContent(createdEntity.getContent());
        returnDto.setCreatorId(createdEntity.getCreator().getId());
        returnDto.setId(createdEntity.getId());
        returnDto.setBoardId(createdEntity.getBoard().getId());
        return Optional.of(returnDto);
    }

    @Override
    public List<NoteDto> findAllByBoardId(UUID boardId) {
        List<Note> noteList = noteRepo.findAllByBoardId(boardId);
        return noteList.stream().map(note -> {
            NoteDto noteDto = new NoteDto();
            noteDto.setId(note.getId());
            noteDto.setBoardId(note.getBoard().getId());
            noteDto.setCreatorId(note.getCreator().getId());
            noteDto.setContent(note.getContent());
            return noteDto;
        }).toList();
    }
}
