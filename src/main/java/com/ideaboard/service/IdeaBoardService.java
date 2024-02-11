package com.ideaboard.service;

import com.ideaboard.model.dto.IdeaBoardDto;

import java.util.List;
import java.util.Optional;

public interface IdeaBoardService {
    List<IdeaBoardDto> getAllIdeaBoards();

    Optional<IdeaBoardDto> getIdeaBoardById(String id);


    Optional<IdeaBoardDto> createIdeaBoard(IdeaBoardDto ideaBoard);
}
