package com.ideaboard.service.impl;

import com.ideaboard.model.IdeaBoard;
import com.ideaboard.model.dto.IdeaBoardDto;
import com.ideaboard.service.IdeaBoardService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IdeaBoardServiceImpl implements IdeaBoardService {
    @Override
    public List<IdeaBoardDto> getAllIdeaBoards() {
        return null;
    }

    @Override
    public void createIdeaBoard(IdeaBoard ideaBoard) {

    }
}
