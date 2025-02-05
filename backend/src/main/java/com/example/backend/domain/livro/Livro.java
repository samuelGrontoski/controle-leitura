package com.example.backend.domain.livro;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Table(name = "livro")
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Livro {
    @Id
    private UUID id;
    private String titulo;
    private String autor;
    private String genero;
    private int num_paginas;
    private int ano_publicacao;
    private String capa_url;
}
