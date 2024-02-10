package com.ideaboard.service.impl;

import com.ideaboard.model.dto.NoteDto;
import com.ideaboard.service.NoteService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class NoteServiceImpl implements NoteService {
    @Override
    public void createNote(NoteDto noteDto) {

    }

    @Override
    public List<NoteDto> findAllByBoardId(UUID boardId) {
        return null;
    }
}
