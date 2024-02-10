package com.ideaboard.model.dto;

import com.ideaboard.model.IdeaBoard;
import com.ideaboard.model.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.validator.cfg.defs.UUIDDef;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class NoteDto {
    @NotNull
    private UUID id;

    @NotNull
    private UUID creatorId;
    
    @NotBlank
    @Size(max = 256)
    private String content;
}
