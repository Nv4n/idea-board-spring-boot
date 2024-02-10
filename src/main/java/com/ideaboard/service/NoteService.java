package com.ideaboard.service;

import com.ideaboard.model.dto.NoteDto;

import java.util.List;
import java.util.UUID;

public interface NoteService {
    void createNote(NoteDto noteDto);

    List<NoteDto> findAllByBoardId(UUID boardId);
}
