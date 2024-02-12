package com.ideaboard.service;

import com.ideaboard.model.dto.IdeaBoardDto;
import com.ideaboard.model.dto.NoteDto;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface NoteService {
    Optional<IdeaBoardDto> createNote(NoteDto noteDto);

    List<NoteDto> findAllByBoardId(UUID boardId);
}
