package com.ideaboard.model.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

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
