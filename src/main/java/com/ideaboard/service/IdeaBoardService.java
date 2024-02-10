package com.ideaboard.service;

import com.ideaboard.model.entity.IdeaBoard;
import com.ideaboard.model.dto.IdeaBoardDto;

import java.util.List;

public interface IdeaBoardService {
    List<IdeaBoardDto> getAllIdeaBoards();

    void createIdeaBoard(IdeaBoard ideaBoard);
}
