package com.example.backend.dto;

import com.example.backend.entity.Livro;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LivroDTO {

    private Long id;
    private String titulo;
    private String autor;
    private String genero;
    private int num_paginas;
    private int ano_publicacao;
    private String capa_url;

    public LivroDTO(Livro livro) {
        BeanUtils.copyProperties(livro, this);
    }
}
