package com.ideaboard.model.dto;

import com.ideaboard.model.Chat;
import com.ideaboard.model.Note;
import com.ideaboard.model.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class IdeaBoardDto {
    @NotNull
    @EqualsAndHashCode.Include
    private UUID id;

    @NotNull
    @EqualsAndHashCode.Include
    private UUID creatorId;
}
