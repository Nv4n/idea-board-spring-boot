package com.ideaboard.model.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class FullIdeaBoardDto {
    @NotBlank
    @EqualsAndHashCode.Include
    private String id;

    @NotBlank
    @EqualsAndHashCode.Include
    private String creatorId;

    @NotBlank
    private String title;

    @NotBlank
    private String chatId;
}
