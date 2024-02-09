package com.ideaboard.dto;

import com.ideaboard.model.Chat;
import com.ideaboard.model.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class MessageDto {
    @NotNull
    private UUID id;

    @NotNull
    private UUID senderId;

    @NotNull
    @Size(max = 256)
    private String content;

    @NotNull
    @PastOrPresent
    private Date createdAt;

}
