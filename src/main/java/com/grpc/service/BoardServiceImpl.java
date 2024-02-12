package com.grpc.service;

import com.google.protobuf.Empty;
import com.grpc.config.JwtValidator;
import com.grpc.model.AuthException;
import com.ideaboard.model.dto.IdeaBoardDto;
import com.ideaboard.service.IdeaBoardService;
import com.ideaboard.service.NoteService;
import io.grpc.stub.StreamObserver;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.lognet.springboot.grpc.GRpcService;
import proto.board.*;

import java.util.List;
import java.util.Optional;


@Slf4j
@GRpcService
public class BoardServiceImpl extends BoardServiceGrpc.BoardServiceImplBase {
    IdeaBoardService ideaBoardService;
    NoteService noteService
    TransactionalBoardService transactionalBoardService;

    public BoardServiceImpl(IdeaBoardService ideaBoardService,NoteService noteService) {
        this.ideaBoardService = ideaBoardService;
        this.noteService=noteService;
        transactionalBoardService = new TransactionalBoardService(ideaBoardService,noteService);
    }

    @SneakyThrows
    @Override
    public void getBoard(GetBoardRequest request, StreamObserver<BoardDto> responseObserver) {
        System.out.println("You are in the getABoard");
        String token = request.getToken();
        System.out.println(token);
        Boolean isVerified = JwtValidator.verifyJwt(token);
        if (!isVerified) {
            throw new AuthException();
        }
        String bid = request.getBoardId();

        Optional<IdeaBoardDto> board = ideaBoardService.getIdeaBoardById(bid);
        if (board.isEmpty()) {
            throw new Exception("No such board");
        }
        BoardDto boardDto = BoardDto.newBuilder()
                .setTitle(board.get().getTitle())
                .setCreatorId(board.get().getCreatorId())
                .setId(board.get().getId())
                .setChatId(board.get().getChatId())
                .build();

        responseObserver.onNext(boardDto);
        responseObserver.onCompleted();
    }

    @SneakyThrows
    @Override
    public void createBoard(CreateBoardRequest request, StreamObserver<Empty> responseObserver) {
        System.out.println("You are in the getAllBoards");
        String token = request.getToken();
        System.out.println(token);
        Boolean isVerified = JwtValidator.verifyJwt(token);
        if (!isVerified) {
            throw new AuthException();
        }
        IdeaBoardDto ideaBoardDto = new IdeaBoardDto();
        ideaBoardDto.setCreatorId(request.getCreatorId());
        ideaBoardDto.setTitle(request.getTitle());
        transactionalBoardService.createTransactionalBoard(ideaBoardDto);

        responseObserver.onNext(Empty.getDefaultInstance());
        responseObserver.onCompleted();
    }

    @SneakyThrows
    @Override
    public void getAllBoards(GetAllBoardsRequest request, StreamObserver<GetAllBoardsResponse> responseObserver) {
        System.out.println("You are in the getAllBoards");
        String token = request.getToken();
        System.out.println(token);
        Boolean isVerified = JwtValidator.verifyJwt(token);
        if (!isVerified) {
            throw new AuthException();
        }

        List<BoardDto> boards = ideaBoardService.getAllIdeaBoards().stream()
                .map(b -> {
                    return BoardDto.newBuilder()
                            .setChatId(b.getChatId())
                            .setId(b.getId())
                            .setCreatorId(b.getCreatorId())
                            .setTitle(b.getTitle())
                            .build();
                }).toList();

        GetAllBoardsResponse response = GetAllBoardsResponse.newBuilder()
                .addAllBoards(boards)
                .build();
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void createNote(CreateNoteRequest request, StreamObserver<Empty> responseObserver) {
        super.createNote(request, responseObserver);
    }

    @Override
    public void getAllNotes(GetAllNotesRequest request, StreamObserver<GetAllNotesResponse> responseObserver) {
        super.getAllNotes(request, responseObserver);
    }
}
