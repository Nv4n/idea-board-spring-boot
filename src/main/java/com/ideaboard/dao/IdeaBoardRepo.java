package com.ideaboard.dao;

import com.ideaboard.model.IdeaBoard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface IdeaBoardRepo extends JpaRepository<IdeaBoard, UUID> {
}
