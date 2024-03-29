package com.ideaboard.dao;

import com.ideaboard.model.entity.IdeaBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface IdeaBoardRepo extends JpaRepository<IdeaBoard, UUID> {
}
