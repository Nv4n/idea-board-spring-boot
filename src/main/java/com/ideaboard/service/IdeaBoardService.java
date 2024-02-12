package com.ideaboard.service;

import com.ideaboard.model.dto.IdeaBoardDto;
import com.ideaboard.model.entity.IdeaBoard;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface IdeaBoardService {
    List<IdeaBoardDto> getAllIdeaBoards();

    Optional<IdeaBoardDto> getIdeaBoardDtoById(String id);

    Optional<IdeaBoard> getIdeaBoardById(UUID id);

    Optional<IdeaBoardDto> createIdeaBoard(IdeaBoardDto ideaBoard);
}
