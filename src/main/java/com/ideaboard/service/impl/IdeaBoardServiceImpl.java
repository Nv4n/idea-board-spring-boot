package com.ideaboard.service.impl;

import com.ideaboard.dao.ChatRepo;
import com.ideaboard.dao.IdeaBoardRepo;
import com.ideaboard.dao.UserRepo;
import com.ideaboard.model.dto.MessageDto;
import com.ideaboard.model.entity.Chat;
import com.ideaboard.model.entity.IdeaBoard;
import com.ideaboard.model.dto.IdeaBoardDto;
import com.ideaboard.model.entity.Message;
import com.ideaboard.model.entity.User;
import com.ideaboard.service.ChatService;
import com.ideaboard.service.IdeaBoardService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class IdeaBoardServiceImpl implements IdeaBoardService {
    private IdeaBoardRepo ideaBoardRepo;
    private UserRepo userRepo;
    private ChatService chatService;

    @Autowired
    public IdeaBoardServiceImpl(IdeaBoardRepo ideaBoardRepo, UserRepo userRepo, ChatService chatService) {
        this.ideaBoardRepo = ideaBoardRepo;
        this.userRepo = userRepo;
        this.chatService = chatService;
    }

    @Override
    public List<IdeaBoardDto> getAllIdeaBoards() {
        return ideaBoardRepo.findAll().stream().map(board -> {
            IdeaBoardDto ideaBoardDto = new IdeaBoardDto();
            ideaBoardDto.setId(board.getId().toString());
            ideaBoardDto.setTitle(board.getTitle());
            ideaBoardDto.setChatId(board.getChat().getId().toString());
            ideaBoardDto.setCreatorId(board.getCreator().getId().toString());
            return ideaBoardDto;
        }).toList();
    }

    @Override
    public Optional<IdeaBoardDto> getIdeaBoardDtoById(String id) {
        Optional<IdeaBoard> board = ideaBoardRepo.findById(UUID.fromString(id));
        if (board.isEmpty()) {
            return Optional.empty();
        }
        IdeaBoardDto ideaBoardDto = new IdeaBoardDto();
        ideaBoardDto.setId(board.get().getId().toString());
        ideaBoardDto.setTitle(board.get().getTitle());
        ideaBoardDto.setChatId(board.get().getChat().getId().toString());
        ideaBoardDto.setCreatorId(board.get().getCreator().getId().toString());
        return Optional.of(ideaBoardDto);
    }

    @Override
    public Optional<IdeaBoard> getIdeaBoardById(UUID id) {
        return ideaBoardRepo.findById(id);
    }

    @Transactional
    @Override
    public Optional<IdeaBoardDto> createIdeaBoard(IdeaBoardDto ideaBoard) {
        Optional<User> user = userRepo.findById(UUID.fromString(ideaBoard.getCreatorId()));
        if (user.isEmpty()) {
            return Optional.empty();
        }


        IdeaBoard ideaBoardEntity = new IdeaBoard();
//        ideaBoardEntity.setChat(chat.get());
        ideaBoardEntity.setCreator(user.get());
        ideaBoardEntity.setTitle(ideaBoard.getTitle());
        ideaBoardEntity.setCreatedAt(new Date());

        IdeaBoard createdEntity = ideaBoardRepo.save(ideaBoardEntity);

        Chat chat = chatService.createChat(createdEntity);
        createdEntity.setChat(chat);
        ideaBoardRepo.save(createdEntity);

        IdeaBoardDto returIdeaBoardDto = new IdeaBoardDto();
        returIdeaBoardDto.setTitle(createdEntity.getTitle());
        returIdeaBoardDto.setChatId(chat.getId().toString());
        returIdeaBoardDto.setId(createdEntity.getId().toString());
        returIdeaBoardDto.setCreatorId(user.get().getId().toString());
        return Optional.of(returIdeaBoardDto);
    }
}
