package com.ideaboard.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class MessageDto {
    @EqualsAndHashCode.Include
    @NotNull
    private String id;

    @EqualsAndHashCode.Include
    @NotNull
    private String senderId;

    @NotNull
    @NotBlank
    @Size(max = 256)
    private String content;

    @NotNull
    @PastOrPresent
    private Date createdAt;
}
